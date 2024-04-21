'use client'

import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './VouchersNav.module.css'

const VouchersNav = () => {
  const { network } = useContext(WalletContext)

  return (
    <div className={styles.box}>
      <Link href={`/${network}/vouchers/add`}>{'add voucher'}</Link>
    </div>
  )
}

export default VouchersNav
