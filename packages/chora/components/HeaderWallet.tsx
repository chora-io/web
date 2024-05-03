'use client'

import * as React from 'react'
import { useContext } from 'react'

import { ThemeContext, MenuContext, WalletContext } from '../contexts'
import { HeaderTitle } from '.'
import { SelectNetwork } from './forms'
import { MenuIcon, ThemeIcon, UserIcon } from './icons'

import styles from './HeaderWallet.module.css'

const HeaderWallet = ({
  title,
  showMenuButton,
  showMobileTitle,
  showUserButton,
  testnetsOnly,
}: any) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext)
  const { showMenu, setShowMenu, showUser, setShowUser } =
    useContext(MenuContext)
  const { network, setNetwork } = useContext(WalletContext)

  const toggleMenu = () => {
    if (showMenu) {
      setShowMenu(false)
    } else {
      setShowMenu(true)
      setShowUser(false)
    }
  }

  const toggleTheme = () => {
    if (darkTheme) {
      setDarkTheme(false)
    } else {
      setDarkTheme(true)
    }
  }

  const toggleUser = () => {
    if (showUser) {
      setShowUser(false)
    } else {
      setShowUser(true)
      setShowMenu(false)
    }
  }

  return (
    <header className={styles.header}>
      <div style={{ display: 'none' }}>{darkTheme?.toString()}</div>
      <div>
        {showMenuButton && (
          <button className={styles.buttonMobile} onClick={toggleMenu}>
            <MenuIcon darkTheme={darkTheme} />
          </button>
        )}
        <HeaderTitle
          darkTheme={darkTheme}
          title={title}
          showMobileTitle={showMobileTitle}
        />
        <div className={styles.menu}>
          <form className={styles.form}>
            <SelectNetwork
              label=" "
              network={network}
              setNetwork={setNetwork}
              testnetsOnly={testnetsOnly}
            />
          </form>
          {showUserButton && (
            <button className={styles.button} onClick={toggleUser}>
              <UserIcon darkTheme={darkTheme} />
            </button>
          )}
          <button className={styles.button} onClick={toggleTheme}>
            <ThemeIcon darkTheme={darkTheme} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default HeaderWallet
