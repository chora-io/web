'use client'

import * as React from 'react'
import { useContext } from 'react'

import { ThemeContext, MenuContext, WalletContext } from '../contexts'
import { HeaderTitle, MenuButton, ThemeButton, UserButton } from '.'
import { SelectNetwork } from './forms'

import styles from './HeaderWallet.module.css'

const HeaderWallet = ({
  title,
  showMenuButton,
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
    }
  }

  return (
    <div className={styles.header}>
      <div style={{ display: 'none' }}>{darkTheme?.toString()}</div>
      <div>
        {showMenuButton && (
          <div className={styles.mobile}>
            <MenuButton darkTheme={darkTheme} toggleMenu={toggleMenu} />
          </div>
        )}
        <HeaderTitle darkTheme={darkTheme} title={title} />
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
            <UserButton darkTheme={darkTheme} toggleUser={toggleUser} />
          )}
          <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  )
}

export default HeaderWallet
