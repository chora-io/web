'use client'

import Link from 'next/link'
import * as React from 'react'
import { useContext } from 'react'

import { MenuContext, ThemeContext } from '../contexts'
import { ArrowUpRight, HeaderTitle, MenuButton, ThemeButton } from '.'

import styles from './Header.module.css'

const Header = ({
  title,
  itemsLeft,
  itemsRight,
  showMenuButton,
  showMobileTitle,
}: any) => {
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
    <div className={styles.header}>
      <div style={{ display: 'none' }}>{darkTheme?.toString()}</div>
      <div>
        {showMenuButton && (
          <div className={styles.showOnMobile}>
            <MenuButton darkTheme={darkTheme} toggleMenu={toggleMenu} />
          </div>
        )}
        <HeaderTitle
          darkTheme={darkTheme}
          title={title}
          showMobileTitle={showMobileTitle}
        />
        <div className={styles.menu}>
          {(itemsLeft || itemsRight) && (
            <ul>
              {itemsLeft &&
                itemsLeft.map((item: any) => (
                  <li key={item.title}>
                    <Link href={item.link} target={item.target}>
                      {item.title}
                      {item.target && <ArrowUpRight />}
                    </Link>
                  </li>
                ))}
              {itemsLeft && itemsRight && (
                <li className={styles.divider}>{'|'}</li>
              )}
              {itemsRight &&
                itemsRight.map((item: any) => (
                  <li key={item.title}>
                    <Link href={item.link} target={item.target}>
                      {item.title}
                      {item.target && <ArrowUpRight />}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
          <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  )
}

export default Header
