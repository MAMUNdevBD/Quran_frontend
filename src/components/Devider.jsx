import React from 'react'
import {Colors} from '../styles'

function Devider() {
  return (
    <div style={styles.devider} />
  )
}

const styles = {
  devider: {
    width: '80%',
    height: '3px',
    backgroundColor: Colors.primaryLight,
    margin: '1rem 0',
  }
}

export default Devider