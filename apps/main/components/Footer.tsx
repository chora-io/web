'use client'

import { ThemeContext } from 'chora'
import choraLogoDark from 'chora/assets/images/chora_dark_small.png'
import choraLogoLight from 'chora/assets/images/chora_light_small.png'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './Footer.module.css'

const Footer = () => {
  let local = false
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname == '0.0.0.0' ||
      window.location.hostname == '127.0.0.1' ||
      window.location.hostname == 'localhost')
  ) {
    local = true
  }

  const { darkTheme } = useContext(ThemeContext)

  return (
    <div className={styles.footer}>
      <div style={{ display: 'none' }}>{darkTheme.toString()}</div>
      <div>
        <div className={styles.title}>
          <Image alt="chora" src={darkTheme ? choraLogoDark : choraLogoLight} />
          <h4>{'© 2023 Chora Studio, LLC'}</h4>
        </div>
        <div className={styles.list}>
          <h3>{'about'}</h3>
          <p>
            {'Chora Protocol is an initiative led by '}
            <Link href="https://chora.studio" target="_blank">
              {'Chora Studio'}
            </Link>
            {'.'}
          </p>
        </div>
        <div className={styles.list}>
          <h3>{'apps (beta)'}</h3>
          {local ? (
            <ul>
              <li>
                <Link href={'http://' + window.location.hostname + ':8001'}>
                  {'chora cooperative'}
                </Link>
              </li>
              <li>
                <Link href={'http://' + window.location.hostname + ':8002'}>
                  {'data management'}
                </Link>
              </li>
              <li>
                <Link href={'http://' + window.location.hostname + ':8003'}>
                  {'blockchain modules'}
                </Link>
              </li>
              <li>
                <Link href={'http://' + window.location.hostname + ':8004'}>
                  {'network scanner'}
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link href="/coop">
                  {'chora cooperative'}
                </Link>
              </li>
              <li>
                <Link href="/data">
                  {'data management'}
                </Link>
              </li>
              <li>
                <Link href="/mods">
                  {'blockchain modules'}
                </Link>
              </li>
              <li>
                <Link href="/scan">
                  {'network scanner'}
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className={styles.list}>
          <h3>{'resources'}</h3>
          <ul>
            <li>
              <Link
                href="https://chora.notion.site/chora-light-paper-8fe227be3e514ab69270087593ec2d83"
                target="_blank"
              >
                {'light paper ↗'}
              </Link>
            </li>
            <li>
              <Link href="https://docs.chora.io/guides" target="_blank">
                {'user guides ↗'}
              </Link>
            </li>
            <li>
              <Link href="https://docs.chora.io/specs" target="_blank">
                {'specifications ↗'}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
