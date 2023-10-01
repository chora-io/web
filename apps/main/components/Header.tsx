'use client'

import { ThemeContext } from 'chora'
import choraLogoDark from 'chora/assets/images/chora_dark_icon.png'
import choraLogoLight from 'chora/assets/images/chora_light_icon.png'
import { ThemeButton } from 'chora/components'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './Header.module.css'

const Header = () => {
  let local = false
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname == '0.0.0.0' ||
      window.location.hostname == '127.0.0.1' ||
      window.location.hostname == 'localhost')
  ) {
    local = true
  }

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
      <div style={{ display: 'none' }}>{darkTheme.toString()}</div>
      <div>
        <div className={styles.title}>
          <Link href="/">
            <Image
              alt="chora"
              src={darkTheme ? choraLogoDark : choraLogoLight}
            />
            <div>{'chora'}</div>
          </Link>
        </div>
        <div className={styles.menu}>
          {local ? (
            <ul>
              <li>
                <Link href={'http://' + window.location.hostname + ':8001'}>
                  {'coop'}
                </Link>
              </li>
              <li>
                <Link href={'http://' + window.location.hostname + ':8002'}>
                  {'data'}
                </Link>
              </li>
              <li>
                <Link href={'http://' + window.location.hostname + ':8003'}>
                  {'mods'}
                </Link>
              </li>
              <li>
                <Link href={'http://' + window.location.hostname + ':8004'}>
                  {'scan'}
                </Link>
              </li>
              <li>
                <Link href={'http://' + window.location.hostname + ':8005'}>
                  {'user'}
                </Link>
              </li>
              <li className={styles.divider}>{'|'}</li>
              <li>
                <Link href="https://docs.chora.io" target="_blank">
                  {'docs'}
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link href="/coop">{'coop'}</Link>
              </li>
              <li>
                <Link href="/data">{'data'}</Link>
              </li>
              <li>
                <Link href="/mods">{'mods'}</Link>
              </li>
              <li>
                <Link href="/scan">{'scan'}</Link>
              </li>
              <li>
                <Link href="/user">{'user'}</Link>
              </li>
              <li className={styles.divider}>{'|'}</li>
              <li>
                <Link href="https://docs.chora.io" target="_blank">
                  {'docs'}
                </Link>
              </li>
            </ul>
          )}
          <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  )
}

export default Header
