'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { useContext } from 'react'

import choraDarkSmall from '../assets//images/chora_dark_small.png'
import choraLightSmall from '../assets//images/chora_light_small.png'
import { ThemeContext } from '../contexts'
import { ArrowUpRight } from '.'

import styles from './Footer.module.css'

const Footer = ({ about, sections }: any) => {
  const { darkTheme } = useContext(ThemeContext)

  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
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
        {sections.map((section: any) => (
          <div className={styles.list} key={section.title}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item: any) => (
                <li key={item.title}>
                  <Link href={item.link} target={item.target}>
                    {item.title}
                    {item.target && <ArrowUpRight />}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer
