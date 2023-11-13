'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import choraLogoDark from '../assets/images/chora_dark_small.png'
import choraLogoLight from '../assets/images/chora_light_small.png'

import styles from './HeaderTitle.module.css'

const HeaderTitle = ({ darkTheme, title }: any) => (
  <div className={styles.title}>
    <Link href={(title && title.link) || '/'}>
      <Image alt="chora" src={darkTheme ? choraLogoDark : choraLogoLight} />
      <div>
        {'chora '}
        {title && title.titleX && (
          <span style={{ opacity: '0.75' }}>{title.titleX}</span>
        )}
      </div>
    </Link>
  </div>
)

export default HeaderTitle
