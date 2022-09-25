import {Box} from '@mui/material'
import React from 'react'
import {Colors} from '../styles'

function SettingsItem({
  children,
  style,
  onClick = () => { },
  gutterBottom = false,
  ...props
}) {

  return (
    <Box
      sx={{
        ...styles.container,
        ...style,
        marginBottom: gutterBottom ? '1rem' : 0,
      }}
    >
      {children}
    </Box>
  )
}

const styles = {
  container: {
    backgroundColor: Colors.secondary,
    borderRadius: '1rem',
    width: '100%',
    marginLeft: '.5rem',
    marginRight: '.5rem',
    padding: '.5rem',
    color: Colors.snowWhite,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  }
}

export default SettingsItem