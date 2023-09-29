'use client'

// import { Metadata } from 'next'

import Vouchers from '@components/vouchers/Vouchers'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'vouchers',
// }

const VouchersPage = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1>{'vouchers'}</h1>
        <Vouchers />
      </div>
    </div>
  )
}

export default VouchersPage
