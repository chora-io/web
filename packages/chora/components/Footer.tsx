'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { useContext } from 'react'

import choraDarkSmall from '../assets//images/chora_dark_small.png'
import choraLightSmall from '../assets//images/chora_light_small.png'
import { ThemeContext } from '../contexts'

import styles from './Footer.module.css'

const Footer = ({ about, items }: any) => {
  const { darkTheme } = useContext(ThemeContext)

  const currentYear = new Date().getFullYear()

  return (
    <div className={styles.footer}>
      <div style={{ display: 'none' }}>{darkTheme?.toString()}</div>
      <div>
        <div className={styles.title}>
          <Image
            alt="chora"
            src={darkTheme ? choraDarkSmall : choraLightSmall}
          />
          <h4>{`© ${currentYear} Chora Studio LLC`}</h4>
        </div>
        {about && (
          <div className={styles.list}>
            <h3>{about.title}</h3>
            <div>{about.text}</div>
          </div>
        )}
        {items.map((item: any) => (
          <div className={styles.list} key={item.title}>
            <h3>{item.title}</h3>
            <ul>
              {item.items.map((item: any) => (
                <li key={item.title}>
                  <Link href={item.link} target={item.target}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
