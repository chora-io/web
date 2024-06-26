'use client'

import Link from 'next/link'
import * as React from 'react'
import { useContext } from 'react'

import { MenuContext, ThemeContext } from '../contexts'
import { HeaderTitle } from '.'
import { ArrowUpRight, MenuIcon, ThemeIcon } from './icons'

import styles from './Header.module.css'

const Header = ({ title, items, showMenuButton, showMobileTitle }: any) => {
  const { showMenu, setShowMenu } = useContext(MenuContext)
  const { darkTheme, setDarkTheme } = useContext(ThemeContext)

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
          <ul>
            {items &&
              items.map((item: any, i: number) =>
                item === 'divider' ? (
                  <li key={i} className={styles.divider}>
                    {'|'}
                  </li>
                ) : (
                  <li key={item.title}>
                    <Link href={item.link} target={item.target}>
                      {item.title}
                      {item.target && <ArrowUpRight />}
                    </Link>
                  </li>
                ),
              )}
          </ul>
          <button className={styles.button} onClick={toggleTheme}>
            <ThemeIcon darkTheme={darkTheme} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
