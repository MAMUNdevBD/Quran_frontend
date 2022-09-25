import React from 'react'
import {Colors} from '../styles'

function SectionTitle({children}) {
  return (
    <h1 style={styles.title}>
      {children}
    </h1>
  )
}

const styles = {
  title: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: '2.5rem',
    borderBottom: `5px solid ${Colors.primary}`,
  }
}

export default SectionTitle