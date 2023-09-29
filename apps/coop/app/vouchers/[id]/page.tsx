'use client'

// import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import Balances from '@components/vouchers/Balances'
import Voucher from '@components/vouchers/Voucher'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'voucher',
// }

const VoucherPage = () => {
  const { id } = useParams()

  // TODO: valid id, otherwise error

  return (
    <div className={styles.page}>
      <div>
        <h1>{'voucher'}</h1>
        <Voucher voucherId={id} />
        <h1>{'balances'}</h1>
        <Balances voucherId={id} />
      </div>
    </div>
  )
}

export default VoucherPage
