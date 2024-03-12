'use client'

import * as React from 'react'
import { useContext } from 'react'

import { ThemeContext } from '../contexts'
import ConnectWallet from './ConnectWallet'
import HeaderTitle from './HeaderTitle'
import ThemeButton from './ThemeButton'

import styles from './HeaderWallet.module.css'

const HeaderWallet = ({ title, testnets }: any) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false)
    } else {
      setDarkTheme(true)
    }
  }

  return (
    <div className={styles.header}>
      <div>
        <HeaderTitle darkTheme={darkTheme} title={title} />
        <div className={styles.menu}>
          <ConnectWallet testnets={testnets} />
          <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  )
}

export default HeaderWallet
