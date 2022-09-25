import {Box} from '@mui/material'
import React from 'react'

function Container({style, children}) {
  return (
    <Box sx={{
      ...styles.container,
    }}>
      <Box sx={{
        ...styles.islamicCorner,
        left: 10,
      }}>
        <img style={styles.cornerImage} src={require('../public/images/islamicCorner.png')} alt="islamicCorner" />
      </Box>
      <Box sx={{
        ...styles.bodyContainer,
        ...style,
      }}>
        {children}
      </Box>
      <Box sx={{
        ...styles.islamicCorner,
        right: 10,
      }}>
        <img style={styles.cornerImage} src={require('../public/images/islamicCorner.png')} alt="islamicCorner" />
      </Box>
    </Box>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  islamicCorner: {
    height: '80%',
    position: 'fixed',
    top: '15%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 1,
    '@media (max-width: 768px)': {
      display: 'none',
    }
  },
  cornerImage: {
    width: '70%',
    height: '100%',
  },
  bodyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  }
}

export default Container