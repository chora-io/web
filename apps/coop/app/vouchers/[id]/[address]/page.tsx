'use client'

// import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import Balance from '@components/vouchers/Balance'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'voucher balance',
// }

const VoucherBalancePage = () => {
  const { id, address } = useParams()

  // TODO: valid id and address, otherwise error

  return (
    <div className={styles.page}>
      <div>
        <h1>{'balance'}</h1>
        <Balance voucherId={id} address={address} />
      </div>
    </div>
  )
}

export default VoucherBalancePage
