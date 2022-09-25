import React from 'react'
import shapes from '../public/images/shapes.png'
import videoPreview from '../public/images/videoPreview.jpg'
import Button from './Button'
import {Grid} from '@mui/material'
import {Colors} from '../styles'
import {t} from '../locale/translate'

function HomeHero({isMobile}) {
  return (
    <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 1, md: 3}} style={{width: '93%', marginTop: !isMobile ? '2rem' : '0'}}>
        {!isMobile ? (
          <>
            {/* Desktop view */}
            <Grid item xs={12} md={6}>
              <h1 style={styles.headerHeading}>
              {t('headerTitle')}
              </h1>
              <h3 style={styles.headerDescription}>
                {t('headerSubTitle')}
              </h3>
              <div style={styles.buttonsContainer}>
                <Button text={t('courses')} />
                <Button text={t('quran')} type={'secondary'} />
              </div>
            </Grid>
            <Grid style={{...styles.rightHeader, height: '50vh'}} item xs={12} md={6}>
              <div style={styles.videoBox}>
                <img src={videoPreview} style={styles.videoImage} alt="videoPreview" />
              </div>
            </Grid>
          </>
        ) : (
            <>
              {/* Mobile View */}
              <Grid style={{...styles.rightHeader, height: '20vh', marginTop: '2rem'}} item xs={12} md={6}>
                <div style={styles.videoBox}>
                  <img src={videoPreview} style={styles.videoImage} alt="videoPreview" />
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
              <h1 style={{...styles.headerHeading, fontSize: '2rem'}}>
              {t('headerTitle')}
              </h1>
              <h3 style={styles.headerDescription}>
              {t('headerSubTitle')}
              </h3>
              <div style={styles.buttonsContainer}>
                <Button text={t('courses')} />
                <Button text={'quran'} type={'secondary'} />
              </div>
            </Grid>
            </>
        )}
      </Grid>
  )
}

const styles = {
  rightHeader: {
    backgroundImage: `url(${shapes})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoBox: {
    width: '70%',
    borderRadius: '1rem',
    overflow: 'hidden',
  },
  videoImage: {
    width: '100%',
  },
  headerHeading: {
    width: '100%',
    fontSize: '4rem',
    fontWeight: 500,
    fontSize: '4rem',
    width: '90%',
    color: Colors.primary,
    margin: '2rem 0 1rem 0'
  },
  headerDescription: {
    fontWeight: 300,
    width: '60%',
    Color: Colors.secondary,
    margin: 0,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
  }
}

export default HomeHero