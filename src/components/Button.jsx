import React from 'react'
import {Colors} from '../styles'

function Button({
  text = "Button",
  type = 'primary',
  style = {},
  onClick = () => {},
}) {
  
  return (
    <div onClick={onClick} style={type === 'secondary' ? styles.secondaryButton : styles.primaryButton }>
      {text}
    </div>
  )
}

const styles = {
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: '1rem',
    padding: '1.7rem 3rem',
    color: Colors.snowWhite,
    margin: '1rem 1rem 1rem 0',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: Colors.primaryLight,

    },
    '&:active': {
      backgroundColor: Colors.ocean,

    }

  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderRadius: '1rem',
    padding: '1.7rem 3rem',
    color: Colors.snowWhite,
    margin: '1rem 1rem 1rem 0',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: Colors.ocean,
    },
    '&:active': {
      backgroundColor: Colors.primary,
    }
  }
}

export default Button