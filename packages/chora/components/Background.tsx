'use client'

import Image from 'next/image'
import * as React from 'react'
import { useContext } from 'react'

import darkBackground from '../assets/images/chora_dark.png'
import lightBackground from '../assets/images/chora_light.png'
import { ThemeContext } from '../contexts'

import styles from './Background.module.css'

const Background = () => {
  const { darkTheme } = useContext(ThemeContext)

  return (
    <div className={styles.background}>
      <Image alt="chora" src={darkTheme ? darkBackground : lightBackground} />
      <div />
    </div>
  )
}

export default Background
