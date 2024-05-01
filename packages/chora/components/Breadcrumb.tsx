'use client'

import Link from 'next/link'
import * as React from 'react'

import { ArrowLeft } from '.'

import styles from './Breadcrumb.module.css'

const Breadcrumb = ({ text }: any) => {
  return (
    <div className={styles.breadcrumb}>
      <Link href={'./'}>
        <ArrowLeft />
        {text}
      </Link>
    </div>
  )
}

export default Breadcrumb
