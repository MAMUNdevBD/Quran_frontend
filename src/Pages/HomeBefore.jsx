import React, {useEffect} from 'react'
import HomeHero from '../components/HomeHero';
import {Colors} from '../styles'
import {fetchQuranChapters} from '../helpers/ApiManager'
import Devider from '../components/Devider';
import SectionTitle from '../components/SectionTitle';
import ChapterCard from '../components/ChapterCard';
import {Box, CircularProgress} from '@mui/material';
import {t} from '../locale/translate';
import Cookies from 'universal-cookie';
import SearchIcon from '@mui/icons-material/Search';
import Container from '../components/Container';
function Home({isMobile}) {

  const cookies = new Cookies();

  const [chapters, setChapters] = React.useState([]);
  const [lang, setLang] = React.useState('sv');
  const [searchText, setSearchText] = React.useState('');

  const getQuranChapters = async () => {
    let data = await fetchQuranChapters();
    setChapters(data.chapters);
  }

  useEffect(() => {
    getQuranChapters();
    setLang(cookies.get("language"))
  }, [])

  return (
    <Container>
      <HomeHero isMobile={isMobile} />
      <SectionTitle>
        {t('quranTitle')}
      </SectionTitle>
      <Box style={styles.searchBox}>
        <Box style={styles.searchBoxInput}>
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            style={{
              ...styles.searchInput,
              color: cookies.get("darkMode") === 'true' ? Colors.snowWhite : '#000'
            }}
            type="text"
            placeholder={t('searchPlaceHolder')}
          />
          <Box style={styles.searchBoxButton}>
            <SearchIcon style={styles.searchIcon} />
          </Box>
        </Box>
      </Box>
      <div dir='rtl' style={styles.quranChapters}>
        {chapters.length === 0 ? <CircularProgress /> : searchText.length === 0 ? chapters.map((chapter, index) => (
          <ChapterCard
            key={index}
            arabicName={chapter.name_arabic}
            translatedName={chapter.translated_name.name}
            chapterNumber={chapter.chapter_number}
            hideTranslation={lang === 'ar'}
          />
          // search in translated name, arabic name and chapter number
        )) : chapters.filter((chapter) => {
          return chapter.translated_name.name.toLowerCase().includes(searchText.toLowerCase()) ||
            chapter.name_arabic.toLowerCase().includes(searchText.toLowerCase()) ||
            chapter.chapter_number.toString().includes(searchText.toLowerCase())
        }).map((chapter, index) => (
          <ChapterCard
            key={index}
            arabicName={chapter.name_arabic}
            translatedName={chapter.translated_name.name}
            chapterNumber={chapter.chapter_number}
            hideTranslation={lang === 'ar'}
          />
        ))}
      </div>
    </Container>
  )
}

const styles = {
  quranChapters: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: '.5rem',
    width: '90%',
    marginTop: '1rem',
  },
  searchBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBoxInput: {
    width: window.innerWidth > 600 ? '25%' : '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: `1px solid ${Colors.grey}`,
    borderRadius: '3rem',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: '1rem',
    width: '70%',
    fontSize: '1.5rem',
  },
  searchBoxButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    padding: '.7rem',
    borderRadius: '3rem',
    marginRight: '.5rem',
    color: Colors.snowWhite,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: Colors.secondary,
    }
  }
}

export default Home