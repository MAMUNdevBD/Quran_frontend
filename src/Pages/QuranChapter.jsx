import {
  Menu,
  MenuItem,
  Skeleton,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchQuranVerses, getChapterInfo } from "../helpers/ApiManager";
import { Colors } from "../styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import InfiniteScroll from "react-infinite-scroll-component";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsItem from "../components/SettingsItem";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { t } from "../locale/translate";
import Cookies from "universal-cookie";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import SearchIcon from "@mui/icons-material/Search";
import SurahSearchMenu from "../components/SurahSearchMenu";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { FastForward, FastRewind, Pause, PlayArrow } from "@mui/icons-material";

const MENU_WIDTH = window.innerWidth > 600 ? "25%" : "75%";
const FONT_INCREMENT_STEP = 0.5;

function QuranChapter() {
  const { chapter_number } = useParams();

  const cookies = new Cookies();

  const [currentAudio, setCurrentAudio] = useState("");
  const [verseAudios, setVerseAudios] = useState("");
  const [audio, setAudio] = useState();
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [showControl, setShowControl] = useState(false);

  console.log(audio?.audioEl);
  console.log(verseAudios);

  const playAudio = () => {
    audio.audioEl.current.play();
    setAudioPlaying(true);
  };

  const pauseAudio = () => {
    audio.audioEl.current.pause();
    setAudioPlaying(false);
  };

  const nextAudio = () => {
    console.log(currentAudio);
    const i = verseAudios.findIndex((ele) => {
      return ele === currentAudio ? true : false;
    });
    setCurrentAudio(verseAudios[i + 1]);
    audio.audioEl.current.play();
  };

  const prevAudio = () => {
    console.log(currentAudio);
    const i = verseAudios.findIndex((ele) => {
      return ele === currentAudio ? true : false;
    });
    if (i !== 0) {
      setCurrentAudio(verseAudios[i - 1]);
      audio.audioEl.current.play();
    }
  };

  const [verses, setVerses] = React.useState([]);
  const [verseInfo, setVerseInfo] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [isNextPage, setIsNextPage] = React.useState(true);
  const [settingsMenuOpen, setSettingsMenuOpen] = React.useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = React.useState(false);

  const [arabicTextSize, setArabicTextSize] = React.useState(2);
  const [translationTextSize, setTranslationTextSize] = React.useState(1);
  const [toolTipEnabled, setToolTipEnabled] = React.useState(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const verseOverFlowMenuOpen = Boolean(anchorEl);

  const handleOpenVerseOverFlowMenu = (event, verseNumber) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseVerseOverFlowMenu = () => {
    setAnchorEl(null);
  };

  const getVerses = async () => {
    let data = await fetchQuranVerses(chapter_number, page);
    let info = await getChapterInfo(chapter_number);
    setPage(page + 1);
    setVerseInfo(info.chapter);
    setVerses([...verses, ...data.verses]);
    setIsNextPage(data.pagination.total_pages > page);
    setVerseAudios(data?.verses.map((v) => v.audio.url));
  };

  const handleTooltipChange = (e) => {
    setToolTipEnabled(e.target.checked);
    cookies.set("toolTipEnabled", e.target.checked);
  };

  const increaseArabicTextSize = () => {
    if (arabicTextSize < 5) {
      setArabicTextSize(arabicTextSize + FONT_INCREMENT_STEP);
      cookies.set("arabicTextSize", arabicTextSize);
    }
  };

  const decreaseArabicTextSize = () => {
    if (arabicTextSize > 2) {
      setArabicTextSize(arabicTextSize - FONT_INCREMENT_STEP);
      cookies.set("arabicTextSize", arabicTextSize);
    }
  };

  const handleArabicFontSizeChange = (e) => {
    const value = e.target.value;
    if (Number(value) >= 2 && Number(value) <= 5) {
      setArabicTextSize(value);
      cookies.set("arabicTextSize", value);
    } else if (Number(value) < 2) {
      setArabicTextSize(2);
      cookies.set("arabicTextSize", 2);
    } else if (Number(value) > 5) {
      setArabicTextSize(5);
      cookies.set("arabicTextSize", 5);
    }
  };

  const increaseTanslationTextSize = () => {
    if (translationTextSize < 2) {
      setTranslationTextSize(translationTextSize + FONT_INCREMENT_STEP);
      cookies.set("translationTextSize", translationTextSize);
    }
  };

  const decreaseTranslationTextSize = () => {
    if (translationTextSize > 0.5) {
      setTranslationTextSize(translationTextSize - FONT_INCREMENT_STEP);
      cookies.set("translationTextSize", translationTextSize);
    }
  };

  const handleTranslationFontSizeChange = (e) => {
    const value = e.target.value;
    if (Number(value) >= 0.5 && Number(value) <= 2) {
      setTranslationTextSize(value);
      cookies.set("translationTextSize", value);
    } else if (Number(value) < 0.5) {
      setTranslationTextSize(0.5);
      cookies.set("translationTextSize", 0.5);
    } else if (Number(value) > 2) {
      setTranslationTextSize(2);
      cookies.set("translationTextSize", 2);
    }
  };

  const handleSettingsMenuButtonClick = () => {
    setSettingsMenuOpen(!settingsMenuOpen);
    setSearchMenuOpen(false);
  };

  const handleSearchMenuButtonClick = () => {
    setSearchMenuOpen(!searchMenuOpen);
    setSettingsMenuOpen(false);
  };

  useEffect(() => {
    getVerses();
    setArabicTextSize(cookies.get("arabicTextSize") || 2);
    if (cookies.get("toolTipEnabled") === "false") {
      setToolTipEnabled(false);
    } else {
      setToolTipEnabled(true);
    }
  }, []);

  const playWord = (audioUrl) => {
    // var gfg = document.getElementsByTagName("audio");
    // gfg.pause();

    let audio = new Audio(audioUrl);
    audio.play();
    console.log(audio);
  };

  const playVerse = (audioUrl) => {
    let audio = new Audio(audioUrl);
    audio.play();
    console.log(audio);
  };

  const VerseSkeleton = () => {
    const repeatAmount = 10;
    return (
      <>
        {[...Array(repeatAmount)].map((e, i) => (
          <Box dir="rtl" key={i} sx={styles.verseContainer}>
            <Box sx={styles.verseText}>
              <Skeleton variant="text" style={styles.textSkeleton} />
              <Skeleton variant="text" style={styles.englishTextSkeleton} />
            </Box>
            <Box sx={styles.verseInfo}>
              <Skeleton variant="circular" width={30} height={30} />
              <Box sx={styles.playButton}>
                <Skeleton
                  style={styles.rhombusSkeleton}
                  variant="rectangular"
                  width={30}
                  height={30}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </>
    );
  };

  return (
    <Box>
      <ReactAudioPlayer
        src={currentAudio}
        autoPlay
        // controls
        ref={(element) => {
          setAudio(element);
        }}
        onPlay={() => {
          setAudioPlaying(true);
        }}
        onEnded={() => setAudioPlaying(false)}
      />
      {/* Audio controller */}
      {showControl && (
        <div className="fixed z-50 flex items-center justify-center bottom-0 left-0 w-full bg-gray-800 h-10">
          <div className="text-white flex gap-6">
            <FastRewind
              className="cursor-pointer"
              onClick={() => prevAudio()}
            />
            {audioPlaying ? (
              <Pause onClick={() => pauseAudio()} />
            ) : (
              <PlayArrow
                className="cursor-pointer"
                onClick={() => playAudio()}
              />
            )}

            <FastForward
              className="cursor-pointer"
              onClick={() => nextAudio()}
            />
          </div>
        </div>
      )}
      {/* Audio controller end */}
      <Box
        onClick={handleSettingsMenuButtonClick}
        sx={{
          ...styles.settingsButton,
          right: settingsMenuOpen ? MENU_WIDTH : 0,
        }}
      >
        <SettingsIcon style={styles.gearIcon} />
      </Box>
      <Box
        onClick={handleSearchMenuButtonClick}
        sx={{ ...styles.searchButton, left: searchMenuOpen ? MENU_WIDTH : 0 }}
      >
        <SearchIcon style={styles.gearIcon} />
      </Box>

      <SurahSearchMenu
        searchMenuOpen={searchMenuOpen}
        MENU_WIDTH={MENU_WIDTH}
        chapterInfo={verseInfo}
      />
      <Box
        sx={{
          ...styles.settingsMenu,
          right: settingsMenuOpen ? 0 : `-${MENU_WIDTH}`,
        }}
      >
        <SettingsItem style={styles.menuItem} gutterBottom>
          <Typography variant="h6">{t("arabicFontSize")}</Typography>

          <Box sx={styles.fontSizeSelect}>
            <Box
              onClick={decreaseArabicTextSize}
              sx={{ ...styles.fontSizeButton, borderRadius: ".5rem 0 0 .5rem" }}
            >
              <RemoveIcon />
            </Box>

            <input
              style={styles.fontSizeInput}
              type="number"
              value={arabicTextSize}
              onChange={handleArabicFontSizeChange}
            />

            <Box
              onClick={increaseArabicTextSize}
              sx={{ ...styles.fontSizeButton, borderRadius: "0 .5rem .5rem 0" }}
            >
              <AddIcon />
            </Box>
          </Box>
        </SettingsItem>

        <SettingsItem style={styles.menuItem} gutterBottom>
          <Typography variant="h6">{t("translationFontSize")}</Typography>

          <Box sx={styles.fontSizeSelect}>
            <Box
              onClick={decreaseTranslationTextSize}
              sx={{ ...styles.fontSizeButton, borderRadius: ".5rem 0 0 .5rem" }}
            >
              <RemoveIcon />
            </Box>

            <input
              style={styles.fontSizeInput}
              type="number"
              value={translationTextSize}
              onChange={handleTranslationFontSizeChange}
            />

            <Box
              onClick={increaseTanslationTextSize}
              sx={{ ...styles.fontSizeButton, borderRadius: "0 .5rem .5rem 0" }}
            >
              <AddIcon />
            </Box>
          </Box>
        </SettingsItem>
        <SettingsItem
          style={{
            ...styles.menuItem,
            flexDirection: "row",
          }}
          gutterBottom
        >
          <Typography variant="h6">{t("tooltip")}</Typography>
          <Switch checked={toolTipEnabled} onChange={handleTooltipChange} />
        </SettingsItem>
      </Box>

      <Box sx={styles.chapterInfo}>
        <Typography variant="h3" style={styles.chapterTitle}>
          {verseInfo?.name_arabic}
        </Typography>
        <Typography variant="h3" style={styles.translatedTitle}>
          {verseInfo?.translated_name?.name}
        </Typography>
        <Typography variant="h3" style={styles.nameComplex}>
          {verseInfo?.name_complex}
        </Typography>
        {/* {verseInfo.bismillah_pre && (
          <Typography
            variant="h3"
            style={{
              ...styles.bismillah,
              fontSize: `${arabicTextSize}rem`,
            }}
          >
            بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </Typography>
        )} */}
      </Box>
      <div className="container mx-auto">
        {/* <InfiniteScroll
        style={styles.container}
        dataLength={verses.length}
        // next={getVerses}
        // hasMore={isNextPage}
        loader={<VerseSkeleton />}
      > */}
        {verses.length === 0 ? (
          <VerseSkeleton />
        ) : (
          verses.map((verse, index) => (
            <Box sx={styles.verseContainer} id={verse.verse_number} key={index}>
              <Box sx={styles.verseInfo}>
                <Typography sx={styles.verseNumberText}>
                  {verse.verse_key}
                </Typography>
                <Box sx={styles.playButton}>
                  <Box sx={styles.rhombus}>
                    <PlayArrowIcon
                      onClick={() => {
                        setCurrentAudio(verse.audio.url);
                        audio.audioEl.current.play();
                        setShowControl(true);
                      }}
                      style={styles.playIcon}
                    />
                  </Box>
                </Box>
                <MoreHorizTwoToneIcon
                  onClick={(e) =>
                    handleOpenVerseOverFlowMenu(e, verse.verse_number)
                  }
                  style={styles.moreIcon}
                  key={index}
                />
              </Box>
              <Box sx={styles.verseText}>
                <Box dir="rtl" sx={styles.arabicText}>
                  {verse.words.map((word, index) => (
                    <div className="" key={index}>
                      {index < verse.words.length - 1 ? (
                        <Tooltip
                          title={word.translation.text}
                          placement="top"
                          disableHoverListener={!toolTipEnabled}
                        >
                          <Typography
                            onClick={() => setCurrentAudio(word.audio_url)}
                            className="amiri-quran"
                            sx={{
                              ...styles.arabicWord,
                              fontSize: `${arabicTextSize}rem`,
                            }}
                          >
                            {word.text_madani}
                          </Typography>
                        </Tooltip>
                      ) : (
                        <Typography
                          key={index}
                          className="amiri-quran"
                          sx={styles.verseNumberIcon}
                        >
                          &#1757;{word.text_madani}
                        </Typography>
                      )}
                    </div>
                  ))}
                </Box>
                <div className="flex flex-wrap mt-4 justify-end font-poppins">
                  {verse.words.map((word, index) => (
                    <div className="" key={index}>
                      {index < verse.words.length - 1 ? (
                        <Typography
                          sx={{
                            ...styles.translatedWord,
                            fontSize: `${translationTextSize}rem`,
                          }}
                        >
                          {word.translation.text}
                        </Typography>
                      ) : null}
                    </div>
                  ))}
                </div>
              </Box>
            </Box>
          ))
        )}
        {/* </InfiniteScroll> */}
      </div>
      <Menu
        anchorEl={anchorEl}
        open={verseOverFlowMenuOpen}
        onClose={handleCloseVerseOverFlowMenu}
        MenuListProps={{
          "aria-labelledby": "simple-menu",
        }}
      >
        <MenuItem onClick={handleCloseVerseOverFlowMenu}>Item 1</MenuItem>
        <MenuItem onClick={handleCloseVerseOverFlowMenu}>Item 2</MenuItem>
        <MenuItem onClick={handleCloseVerseOverFlowMenu}>Item 3</MenuItem>
      </Menu>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 5% 0 5%",
    padding: "0 1% 0 1%",
    justifyContent: "center",
    marginTop: "3%",
  },
  verse: {
    display: "flex",
    flexDirection: "column",
  },
  verseText: {
    width: "95%",
  },
  verseContainer: {
    borderBottom: `2px solid ${Colors.primary}`,
    paddingBottom: "1rem",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  arabicText: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },
  arabicWord: {
    marginLeft: "0.5rem",
    fontFamily: "meQuran",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: Colors.primaryLight20,
      borderRadius: "0.5rem",
    },
  },
  verseInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  verseNumberText: {
    color: Colors.primaryLight,
    fontFamily: "Poppings",
    fontSize: "1.3rem",
  },
  translatedWord: {
    marginRight: "0.5rem",
  },
  verseNumberIcon: {
    fontFamily: "Amiri QuranWeb",
    fontSize: "2rem",
    marginRight: "1rem",
  },
  rhombus: {
    width: "2rem",
    height: "2rem",
    backgroundColor: Colors.primaryLight,
    transform: "rotate(45deg)",
    borderRadius: ".5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all .3s ease-in-out",
    "&:hover": {
      backgroundColor: Colors.primary,
      cursor: "pointer",
    },
  },
  playButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1rem",
  },
  playIcon: {
    transform: "rotate(-45deg)",
    fontSize: "1.5rem",
    color: Colors.snowWhite,
  },
  textSkeleton: {
    width: "80%",
    height: "2rem",
    alignSelf: "flex-start",
  },
  englishTextSkeleton: {
    width: "80%",
    alignSelf: "flex-end",
    marginRight: "15%",
  },
  rhombusSkeleton: {
    marginTop: ".5rem",
    transform: "rotate(45deg)",
    borderRadius: ".5rem",
  },
  chapterInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
  },
  chapterTitle: {
    fontFamily: "Amiri QuranWeb",
  },
  translatedTitle: {
    fontFamily: "Poppings",
    fontSize: "1.3rem",
    marginTop: "1.5rem",
  },
  nameComplex: {
    fontFamily: "Poppins",
    fontSize: "1rem",
    marginTop: ".5rem",
    color: Colors.grey,
  },
  bismillah: {
    fontFamily: "Amiri QuranWeb",
    fontSize: "3rem",
    marginTop: "1rem",
    marginBottom: "1.5rem",
  },
  settingsButton: {
    position: "fixed",
    top: "10rem",
    width: "4rem",
    height: "4rem",
    backgroundColor: Colors.primary,
    borderRadius: "1rem 0 0 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: Colors.snowWhite,
    fontSize: "2rem",
    cursor: "pointer",
    transition: "all .3s ease-in-out",
    "&:hover": {
      backgroundColor: Colors.primaryLight,
    },
    "&:active": {
      backgroundColor: Colors.secondary,
    },
  },
  searchButton: {
    position: "fixed",
    top: "10rem",
    width: "4rem",
    height: "4rem",
    backgroundColor: Colors.primary,
    borderRadius: "0 1rem 1rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: Colors.snowWhite,
    fontSize: "2rem",
    cursor: "pointer",
    transition: "all .3s ease-in-out",
    "&:hover": {
      backgroundColor: Colors.primaryLight,
    },
    "&:active": {
      backgroundColor: Colors.secondary,
    },
  },
  settingsMenu: {
    position: "fixed",
    top: 0,
    width: MENU_WIDTH,
    height: "100%",
    backgroundColor: Colors.primary,
    transition: "all .3s ease-in-out",
    boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.2)",
    zIndex: "100",
    borderRadius: "1rem 0 0 1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    width: window.innerWidth > 600 ? "90%" : "75%",
    flexDirection: "column",
    paddingBottom: "1rem",
  },
  fontSizeSelect: {
    display: "flex",
    flexDirection: "row",
  },
  fontSizeButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: Colors.primaryLight,
    transition: "all .2s ease-in-out",
    "&:hover": {
      backgroundColor: Colors.primary,
      cursor: "pointer",
    },
    "&:active": {
      backgroundColor: Colors.secondary,
    },
  },
  fontSizeInput: {
    borderRadius: 0,
    color: Colors.snowWhite,
    width: "90%",
    backgroundColor: Colors.primaryLight50,
    border: "none",
    textAlign: "center",
    fontSize: "1rem",
    //remove increment button from input
    // "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
    //   display: "none",
    //   "-webkit-appearance": "none",
    // },
  },
  moreIcon: {
    fontSize: "2rem",
    color: Colors.primary,
    marginTop: "1rem",
    cursor: "pointer",
    transition: "all .3s ease-in-out",
    "&:hover": {
      color: Colors.primaryLight,
    },
  },
  searchBoxButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: ".7rem",
    borderRadius: "3rem",
    marginRight: ".5rem",
    color: Colors.snowWhite,
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: Colors.secondary,
    },
  },
};

export default QuranChapter;
