'use client'

// import { Metadata } from 'next'

import Geonodes from '@components/geonodes/Geonodes'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'geonodes',
// }

const GeonodesPage = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1>{'geonodes'}</h1>
        <Geonodes />
      </div>
    </div>
  )
}

export default GeonodesPage
