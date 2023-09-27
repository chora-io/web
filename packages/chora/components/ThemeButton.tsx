import * as React from 'react'

import styles from './ThemeButton.module.css'

const ThemeButton = ({ darkTheme, toggleTheme }: any) => (
  <button className={styles.button} onClick={toggleTheme}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.5em"
      width="1.5em"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="40" fill={darkTheme ? '#F5F5F5' : '#0A0A0A'} />
      <circle cx="60" cy="50" r="35" fill={darkTheme ? '#111111' : '#FFFFFF'} />
    </svg>
  </button>
)

export default ThemeButton
