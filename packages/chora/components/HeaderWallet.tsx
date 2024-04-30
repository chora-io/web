'use client'

import * as React from 'react'
import { useContext, useEffect, useState } from 'react'

import { ThemeContext, MenuContext, WalletContext } from '../contexts'
import { cachedNetworkKey, defaultNetwork } from '../contexts/WalletContext'
import { HeaderTitle, MenuButton, ThemeButton, UserButton } from '.'
import { SelectNetwork } from './forms'

import styles from './HeaderWallet.module.css'

const HeaderWallet = ({
  title,
  testnets,
  showMenuButton,
  showUserButton,
}: any) => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext)
  const { showMenu, setShowMenu, showUser, setShowUser } =
    useContext(MenuContext)
  const { network, setNetwork, wallet, loading } = useContext(WalletContext)

  const [selected, setSelected] = useState<string>('')

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

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      if (loading === true) {
        setSelected(localStorage.getItem(cachedNetworkKey) || defaultNetwork)
      } else if (!wallet) {
        setSelected(network || defaultNetwork)
        localStorage.setItem(cachedNetworkKey, network || defaultNetwork)
      } else {
        setSelected(network || defaultNetwork)
        localStorage.setItem(cachedNetworkKey, network || defaultNetwork)
      }
    }
  }, [network, wallet, loading])

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
              selected={selected}
              setNetwork={setNetwork}
              testnets={testnets}
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
