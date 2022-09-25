import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { t } from "../locale/translate";
import { Colors } from "../styles";
import { fetchQuranChapters } from "../helpers/ApiManager";
import Cookies from "universal-cookie";
import { Link as a, animateScroll as scroll } from "react-scroll";

function SurahSearchMenu({ searchMenuOpen, MENU_WIDTH, chapterInfo }) {
  const cookies = new Cookies();

  const [searchText, setSearchText] = React.useState("");
  const [chapters, setChapters] = React.useState([]);
  const [indicatorPos, setIndicatorPos] = React.useState(-100);
  const [typeToShow, setTypeToShow] = React.useState("SURAH");
  const [amountVerses, setAmountVerses] = React.useState(0);

  const AMOUNT_PAGES = 485;

  const getQuranChapters = async () => {
    let data = await fetchQuranChapters();
    setChapters(data.chapters);
  };

  const handleTypeClick = (posToSet, name) => {
    setIndicatorPos(posToSet);
    setTypeToShow(name);
  };

  const goToChapter = (chapterNumber) => {
    window.location.href = `/chapter/${chapterNumber}`;
  };

  useEffect(() => {
    getQuranChapters();
  }, []);

  useEffect(() => {
    // setAmountVerses(chapterInfo.verses_count)
  }, [chapterInfo]);

  return (
    <Box
      sx={{
        ...styles.searchMenu,
        left: searchMenuOpen ? 0 : `-${MENU_WIDTH}`,
        width: MENU_WIDTH,
      }}
    >
      <Box style={styles.searchBox}>
        <Box style={styles.searchBoxInput}>
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{
              ...styles.searchInput,
              color:
                cookies.get("darkMode") === "true" ? Colors.snowWhite : "#000",
            }}
            type="text"
            placeholder={t("searchPlaceHolder")}
          />
          <Box sx={styles.searchBoxButton}>
            <SearchIcon style={styles.searchIcon} />
          </Box>
        </Box>
      </Box>
      <Box sx={styles.typeSelector}>
        <Box
          onClick={() => handleTypeClick(-100, "SURAH")}
          sx={styles.typeSelectorItem}
        >
          <Typography variant="subtitle1">{t("surah")}</Typography>
        </Box>
        <Box
          onClick={() => handleTypeClick(0, "PAGE")}
          sx={styles.typeSelectorItem}
        >
          <Typography variant="subtitle1">{t("page")}</Typography>
        </Box>
        {/* <Box onClick={() => handleTypeClick(100, 'VERSE')} sx={styles.typeSelectorItem}>
          <Typography variant='subtitle1'>
            {t('verse')}
          </Typography>
        </Box> */}
        <Box
          sx={{
            ...styles.typeSelectorIndicator,
            transform: `translateX(${indicatorPos}%)`,
            left: "50%",
          }}
        />
      </Box>
      <Box sx={styles.list}>
        {typeToShow === "SURAH" ? (
          <>
            {searchText !== "" ? (
              <>
                {chapters
                  .filter((chapter) => {
                    return (
                      chapter.translated_name.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      chapter.name_arabic
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      chapter.chapter_number
                        .toString()
                        .includes(searchText.toLowerCase())
                    );
                  })
                  .map((chapter, index) => (
                    <Box
                      onClick={() => goToChapter(chapter.chapter_number)}
                      sx={styles.listItem}
                      key={index}
                    >
                      <Typography variant="subtitle1">
                        {chapter.chapter_number}
                      </Typography>
                      <Typography variant="subtitle1">
                        {chapter.translated_name.name}
                      </Typography>
                    </Box>
                  ))}
              </>
            ) : (
              <>
                {chapters.map((chapter, index) => (
                  <Box
                    onClick={() => goToChapter(chapter.chapter_number)}
                    sx={styles.listItem}
                    key={index}
                  >
                    <Typography variant="subtitle1">
                      {chapter.chapter_number}
                    </Typography>
                    <Typography variant="subtitle1">
                      {chapter.translated_name.name}
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </>
        ) : typeToShow === "PAGE" ? (
          <>
            {searchText !== "" ? (
              <>
                {Array.from(Array(AMOUNT_PAGES).keys())
                  .filter((element, index) => {
                    return element
                      .toString()
                      .includes(searchText.toLowerCase());
                  })
                  .map((element, index) => (
                    <Box
                      sx={{
                        ...styles.listItem,
                        justifyContent: "center",
                      }}
                      key={index}
                    >
                      <Typography variant="subtitle1">{element}</Typography>
                    </Box>
                  ))}
              </>
            ) : (
              <>
                {Array.from({ length: AMOUNT_PAGES }, (_, i) => (
                  <Box
                    sx={{
                      ...styles.listItem,
                      justifyContent: "center",
                    }}
                    key={i}
                  >
                    <Typography variant="subtitle1">{i + 1}</Typography>
                  </Box>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {searchText !== "" ? (
              <>
                {Array.from(Array(amountVerses).keys())
                  .filter((element, index) => {
                    return element
                      .toString()
                      .includes(searchText.toLowerCase());
                  })
                  .map((element, index) => (
                    <Box
                      sx={{
                        ...styles.listItem,
                        justifyContent: "center",
                      }}
                      key={element}
                    >
                      <Typography variant="subtitle1">
                        <a style={styles.link} href={`#${element}`}>
                          {element}
                        </a>
                      </Typography>
                    </Box>
                  ))}
              </>
            ) : (
              <>
                {Array.from({ length: amountVerses }, (_, i) => (
                  <Box
                    sx={{
                      ...styles.listItem,
                      justifyContent: "center",
                    }}
                    key={i}
                  >
                    <Typography variant="subtitle1">
                      <a style={styles.link} href={`#${i + 1}`}>
                        {i + 1}
                      </a>
                    </Typography>
                  </Box>
                ))}
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

const styles = {
  searchMenu: {
    position: "fixed",
    top: 0,
    height: "100%",
    backgroundColor: Colors.primary,
    transition: "all .3s ease-in-out",
    boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.2)",
    zIndex: "100",
    borderRadius: "0rem 1rem 1rem 0rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "2rem",
  },
  searchBox: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBoxInput: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    border: `1px solid ${Colors.grey}`,
    backgroundColor: Colors.snowWhite,
    borderRadius: "3rem",
  },
  searchInput: {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    padding: "1rem",
    width: "70%",
    fontSize: "1rem",
  },
  searchBoxButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: ".5rem",
    borderRadius: "3rem",
    marginRight: ".5rem",
    color: Colors.snowWhite,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: Colors.secondary,
    },
  },
  typeSelector: {
    width: "80%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1rem",
    justifyContent: "center",
    color: Colors.snowWhite,
    padding: ".5rem",
    borderBottom: `1px solid ${Colors.secondary}`,
  },
  typeSelectorItem: {
    zIndex: 2,
    textAlign: "center",
    width: "30%",
    cursor: "pointer",
  },
  typeSelectorIndicator: {
    width: "24%",
    height: "1.5rem",
    backgroundColor: Colors.secondary,
    borderRadius: "1rem",
    transition: "all 0.2s ease-in-out",
    position: "absolute",
  },
  list: {
    width: "100%",
    height: "calc(100% - 2rem)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    overflowY: "scroll",
    color: Colors.snowWhite,
    paddingBottom: "2rem",
  },
  listItem: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderBottom: `1px solid ${Colors.grey}`,
    cursor: "pointer",
  },
  link: {
    color: Colors.snowWhite,
    textDecoration: "none",
  },
};

export default SurahSearchMenu;
