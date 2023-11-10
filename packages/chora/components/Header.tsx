'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import { ThemeContext } from '../contexts'
import ThemeButton from '../components/ThemeButton'

import choraLogoDark from '../assets/images/chora_dark_small.png'
import choraLogoLight from '../assets/images/chora_light_small.png'

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
