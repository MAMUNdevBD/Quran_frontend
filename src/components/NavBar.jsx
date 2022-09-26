import { makeStyles } from "@mui/styles";
import { Box, Collapse, Switch, Typography } from "@mui/material";
import React from "react";
import { Colors } from "../styles";
import navLogo from "../public/images/navLogo.png";
import se from "../public/images/flags/sv.png";
import en from "../public/images/flags/en.png";
import ar from "../public/images/flags/ar.png";
import { Divider } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { setLanguage, t } from "../locale/translate";
import { useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import Cookies from "universal-cookie";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SettingsItem from "./SettingsItem";
import CloseIcon from "@mui/icons-material/Close";

function NavBar({ isMobile, isDarkMode, setIsDarkMode }) {
  const cookies = new Cookies();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = React.useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = React.useState(false);

  const [lang, setLang] = React.useState(cookies.get("language") || "sv");

  const handleMenuButtonClick = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLanguageButtonClick = () => {
    setLanguageMenuOpen(!languageMenuOpen);
    setSettingsMenuOpen(false);
  };

  const handleSettingsButtonClick = () => {
    setSettingsMenuOpen(!settingsMenuOpen);
    setLanguageMenuOpen(false);
  };

  const handleDarkModeChange = (e) => {
    if (e.target.checked) {
      cookies.set("darkMode", true);
      setIsDarkMode(true);
    } else {
      cookies.set("darkMode", false);
      setIsDarkMode(false);
    }
  };

  const handleLanguageSelect = (lang) => {
    cookies.set("language", lang);
    setLang(lang);
    setLanguage(lang);
    window.location.reload();
  };

  const menuItems = [
    { name: t("nav_home"), link: "/" },
    { name: t("courses"), link: "/kurser" },
    { name: t("nav_wordKnowladge"), link: "/ordkunskap" },
    { name: t("nav_materials"), link: "/material" },
    { name: t("nav_aboutus"), link: "/om-oss" },
  ];

  const languages = [
    { name: "Svenska", value: "sv", flag: se },
    { name: "English", value: "en", flag: en },
    { name: "العربية", value: "ar", flag: ar },
  ];

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.classList.contains("language-button")) {
        setLanguageMenuOpen(false);
      }
    });
    setIsDarkMode(cookies.get("darkMode") === "false" ? false : true);
  }, []);

  return (
    <>
      <div
        style={styles.container}
        className="flex justify-between rounded-full z-50 items-center h-20"
      >
        <div className="flex justify-between w-full items-center">
          <a
            href="/"
            style={{
              margin: 0,
              padding: 0,
              display: "flex",
              alignContent: "center",
            }}
          >
            <img style={styles.logo} src={navLogo} alt="navLogo" />
          </a>
          {!isMobile ? (
            <>
              <div className="flex justify-center w-full">
                {menuItems.map((item, index) => (
                  <div className="" key={index}>
                    <a href={item.link} style={styles.menuItem}>
                      {item.name}
                    </a>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                onClick={handleMenuButtonClick}
                style={styles.mobileMenuButton}
              >
                <MenuRoundedIcon />
              </div>
            </>
          )}
        </div>
        {!isMobile && (
          <Box sx={styles.prefContainer}>
            <Box
              onClick={() => handleSettingsButtonClick()}
              sx={styles.settingsButton}
            >
              <SettingsIcon />
            </Box>
            <div
              onClick={handleLanguageButtonClick}
              className={"language-button"}
              style={styles.languageSelectButtonContainer}
            >
              <div
                className={"language-button"}
                style={styles.languageSelectButton}
              >
                <div style={styles.flagContainer}>
                  <img
                    className={"language-button"}
                    style={styles.flag}
                    src={
                      lang === "sv"
                        ? se
                        : lang === "en"
                        ? en
                        : lang === "ar" && ar
                    }
                    alt="navLogo"
                  />
                </div>
                {lang}
              </div>
            </div>
          </Box>
        )}
      </div>

      {isMobile && (
        <Box
          sx={{
            ...styles.mobileMenu,
            right: mobileMenuOpen ? "75%" : 0,
          }}
        >
          <Box
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              ...styles.closeButton,
              display: mobileMenuOpen ? "flex" : "none",
            }}
          >
            <CloseIcon />
          </Box>
          <Box sx={styles.mobileMenuContainer}>
            {menuItems.map((item, index) => (
              <a href={item.link} key={index} style={styles.mobileMenuItem}>
                {item.name}
              </a>
            ))}
          </Box>
        </Box>
      )}
      {languageMenuOpen && (
        <Box style={styles.languageSelector}>
          {languages.map((item, index) => (
            <Box
              key={index}
              onClick={() => {
                handleLanguageSelect(item.value);
              }}
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  backgroundColor: Colors.primary,
                },
              }}
              style={styles.language}
            >
              <div style={styles.flagContainer}>
                <img style={styles.flag} src={item.flag} alt="navLogo" />
              </div>
              <Typography style={styles.languageText}>{item.name}</Typography>
            </Box>
          ))}
        </Box>
      )}
      {settingsMenuOpen && (
        <Box style={styles.settingsMenu}>
          <SettingsItem>
            <DarkModeIcon />
            <Switch onChange={handleDarkModeChange} checked={isDarkMode} />
          </SettingsItem>
        </Box>
      )}
    </>
  );
}

const styles = {
  container: {
    backgroundColor: Colors.primary,
    // height: "5rem",
    // borderRadius: "1.5rem",
    // width: "100%",
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    // zIndex: "100",
  },
  logo: {
    height: "3.5rem",
    paddingLeft: "2rem",
  },
  menuItem: {
    margin: "0 1rem",
    color: Colors.snowWhite,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 300,
    fontSize: "1.5rem",
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      textShadow: "0 5px 5px rgba(0, 0, 0,.5)",
    },
  },
  languageSelectButtonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "2rem",
  },
  languageSelectButton: {
    backgroundColor: Colors.secondary,
    borderRadius: "1.5rem",
    padding: ".7rem .9rem",
    color: Colors.snowWhite,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  flagContainer: {
    width: "2rem",
    height: "2rem",
    display: "flex",
    flexDirection: "row",
    marginRight: "0.5rem",
  },
  flag: {
    transform: "translateX(-15%)",
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  mobileMenuButton: {
    border: `1px solid rgba(255,255,255,0.5)`,
    padding: "0.5rem",
    borderRadius: ".5rem",
    color: Colors.snowWhite,
    transition: "all 0.1s ease-in-out",
    "&:active": {
      backgroundColor: Colors.secondary,
    },
  },
  languageSelector: {
    position: "absolute",
    top: "10%",
    right: "2%",
    padding: "1rem",
    borderRadius: "1rem",
    backgroundColor: Colors.primaryLight,
    boxShadow: "0 1rem 1rem rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  language: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    alignItems: "center",
    justifyContent: "flex-start",
    transition: "all 0.2s ease-in-out",
    padding: "1rem 1.5rem",
    borderRadius: "1rem",
  },
  languageText: {
    color: Colors.snowWhite,
    marginLeft: "1rem",
  },
  prefContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "10%",
  },
  settingsButton: {
    backgroundColor: Colors.secondary,
    borderRadius: "1.5rem",
    padding: ".9rem .9rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: Colors.snowWhite,
    marginRight: ".5rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
  settingsMenu: {
    position: "absolute",
    top: "10%",
    right: "7%",
    padding: "1rem",
    borderRadius: "1rem",
    backgroundColor: Colors.primaryLight,
    boxShadow: "0 1rem 1rem rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileMenuContainer: {
    position: "fixed",
    top: "0",
    width: "75%",
    height: "100%",
    backgroundColor: Colors.primary,
    zIndex: "100",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease-in-out",
  },
  closeButton: {
    position: "absolute",
    top: "7rem",
    right: "74%",
    backgroundColor: Colors.primary,
    padding: "1rem",
    color: Colors.snowWhite,
    borderRadius: ".5rem 0 0 .5rem",
    boxShadow: "0 1rem 1rem rgba(0,0,0,0.2)",
    transition: "all 0.3s ease-in-out",
  },
  mobileMenuItem: {
    margin: "1rem",
    color: Colors.snowWhite,
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontSize: "1.5rem",
    textDecoration: "none",
  },
  mobileMenu: {
    position: "absolute",
    top: 0,
    transition: "all 0.3s ease-in-out",
  },
};

export default NavBar;
