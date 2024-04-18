'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './GeonodesNav.module.css'

const GeonodesNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/geonodes/create`}>{'create geonode'}</Link>
    </div>
  )
}

export default GeonodesNav
