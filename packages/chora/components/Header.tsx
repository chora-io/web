'use client'

import Link from 'next/link'
import * as React from 'react'
import { useContext } from 'react'

import { MenuContext, ThemeContext } from '../contexts'
import { BlankArrow, HeaderTitle, MenuButton, ThemeButton } from '.'

import styles from './Header.module.css'

const Header = ({ title, itemsLeft, itemsRight }: any) => {
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
        <div className={styles.mobile}>
          <MenuButton darkTheme={darkTheme} toggleMenu={toggleMenu} />
        </div>
        <HeaderTitle darkTheme={darkTheme} title={title} />
        <div className={styles.menu}>
          {(itemsLeft || itemsRight) && (
            <ul>
              {itemsLeft &&
                itemsLeft.map((item: any) => (
                  <li key={item.title}>
                    <Link href={item.link} target={item.target}>
                      {item.title}
                      {item.target && <BlankArrow color={'#00C3A5'} />}
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
                      {item.target && <BlankArrow color={'#00C3A5'} />}
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
