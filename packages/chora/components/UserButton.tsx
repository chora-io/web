import * as React from 'react'

import styles from './UserButton.module.css'

const UserButton = ({ darkTheme, toggleUser }: any) => (
  <button className={styles.button} onClick={toggleUser}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1.5em"
      width="1.5em"
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="40" r="30" fill={darkTheme ? '#FFFFFF' : '#111111'} />
      <circle cx="48" cy="40" r="22" fill={darkTheme ? '#111111' : '#FFFFFF'} />
      <circle
        cx="50"
        cy="105"
        r="40"
        fill={darkTheme ? '#FFFFFF' : '#111111'}
      />
      <circle
        cx="48"
        cy="105"
        r="32"
        fill={darkTheme ? '#111111' : '#FFFFFF'}
      />
    </svg>
  </button>
)

export default UserButton
