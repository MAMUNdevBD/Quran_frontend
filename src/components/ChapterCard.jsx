import {Box, Typography} from '@mui/material'
import React from 'react'
import {Colors} from '../styles'

function ChapterCard({arabicName, chapterNumber, translatedName, hideTranslation}) {

  const navigateToChapter = () => {
    window.location.href = `/chapter/${chapterNumber}`
  }

  return (
    <Box onClick={navigateToChapter} sx={styles.container} className='quranChapterCard'>
      <Box dir='rtl' sx={styles.Namecontainer}>
        <Typography style={styles.arabicText} variant="h5">
        سورة {arabicName}
        </Typography>
        {!hideTranslation && (
          <Typography sx={styles.translatedText} variant="h6">
          {translatedName}
          </Typography>
        )}
      </Box>
      <Box style={styles.chapterNumberContainer}>
        <Typography sx={styles.chapterNumber} variant="h5">
          {chapterNumber}
        </Typography>
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    backgroundColor: Colors.primaryLight,
    borderRadius: '1rem',
    padding: '.5rem',
    height: '6rem',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '.5rem',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: Colors.secondary,
    }
  },
  Namecontainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  arabicText: {
    color: Colors.snowWhite,
    fontFamily: 'Amiri',
    fontSize: '2rem',
    fontFamily: 'Amiri QuranWeb',
    marginBottom: '.5rem',
  },
  translatedText: {
    color: Colors.snowWhite,
    fontFamily: 'Poppins',
    fontSize: '1rem',
    width: '100%',
  },
  chapterNumberContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    width: '3rem',
    height: '3rem',
    padding: '0.5rem',
    borderRadius: '50%',
  },
  chapterNumber: {
    color: Colors.snowWhite,
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: '2rem',
  }
}

export default ChapterCard