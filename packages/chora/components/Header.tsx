'use client'

import Link from 'next/link'
import * as React from 'react'
import { useContext } from 'react'

import { ThemeContext } from '../contexts'
import { HeaderTitle, ThemeButton } from '.'

import styles from './Header.module.css'

const Header = ({ title, itemsLeft, itemsRight }: any) => {
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
      <div style={{ display: 'none' }}>{darkTheme?.toString()}</div>
      <div>
        <HeaderTitle darkTheme={darkTheme} title={title} />
        <div className={styles.menu}>
          {(itemsLeft || itemsRight) && (
            <ul>
              {itemsLeft &&
                itemsLeft.map((item: any) => (
                  <li key={item.title}>
                    <Link href={item.link}>{item.title}</Link>
                  </li>
                ))}
              {itemsLeft && itemsRight && (
                <li className={styles.divider}>{'|'}</li>
              )}
              {itemsRight &&
                itemsRight.map((item: any) => (
                  <li key={item.title}>
                    <Link href={item.link} target="_blank">
                      {item.title}
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
