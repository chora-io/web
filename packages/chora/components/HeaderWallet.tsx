'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { useContext } from 'react'

import { ThemeContext } from '../contexts'
import ConnectWallet from './ConnectWallet'
import ThemeButton from './ThemeButton'

import choraLogoDark from 'chora/assets/images/chora_dark_icon.png'
import choraLogoLight from 'chora/assets/images/chora_light_icon.png'

import styles from './HeaderWallet.module.css'

const HeaderWallet = ({ title }: any) => {
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
        <div className={styles.title}>
          <Link href={(title && title.link) || '/'}>
            <Image
              alt="chora"
              src={darkTheme ? choraLogoDark : choraLogoLight}
            />
            <div>
              {'chora '}
              {title && title.titleX && (
                <span style={{ opacity: '0.75' }}>{title.titleX}</span>
              )}
            </div>
          </Link>
        </div>
        <div className={styles.menu}>
          <ConnectWallet />
          <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  )
}

export default HeaderWallet
