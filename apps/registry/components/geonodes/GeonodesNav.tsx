'use client'

import Link from 'next/link'

import styles from './GeonodesNav.module.css'

const GeonodesNav = () => {
  return (
    <div className={styles.box}>
      <Link href={`/geonodes/create`}>{'create geonode'}</Link>
    </div>
  )
}

export default GeonodesNav
