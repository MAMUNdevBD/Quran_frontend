import logo from './logo.svg';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import './fonts/amiri/amiri.css'
import './fonts/me_quran/me_quran.css'
import {Box} from '@mui/system';
import Home from './Pages/Home';
import NavBar from './components/NavBar';
import {createTheme} from '@mui/material';
import {ThemeProvider} from '@mui/styles';
import {useEffect, useState} from 'react';
import QuranChapter from './Pages/QuranChapter';
import Cookies from 'universal-cookie';
import {setLanguage} from './locale/translate';
import {Colors} from './styles';


function App() {

  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false)

  const cookies = new Cookies();
  

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  })

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
    }
  })

  useEffect(() => {

    if (width < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }

    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
      , false);
    if (cookies.get('darkMode') === 'true') {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, [])

  useEffect(() => {
    setLanguage(cookies.get("language"));
  }, [cookies])


  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Box
        p={3}
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          transition: 'all 0.5s ease',
        }}
      >
        <NavBar
          isMobile={isMobile}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chapter/:chapter_number" element={<QuranChapter />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
