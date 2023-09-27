'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import { regenLocal } from 'chora/chains'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'
import Account from '@components/chain/account/Account'
import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: regenLocal.chainId,
// }

const RegenLocalPage = () => {
  const searchParams = useSearchParams()

  const address = searchParams.get('address')
  const tx = searchParams.get('tx')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{regenLocal.chainName}</h1>
        </div>
        <div>
          <h3>{`(${regenLocal.chainId})`}</h3>
        </div>
      </div>
      {address && (
        <div className={styles.content}>
          <Account rest={regenLocal.rest} address={address} />
        </div>
      )}
      {tx && (
        <div className={styles.content}>
          <Transaction rest={regenLocal.rest} tx={tx} />
        </div>
      )}
      {!address && !tx && (
        <div className={styles.content}>
          <Validators rest={regenLocal.rest} />
          <Accounts chainId={regenLocal.chainId} rest={regenLocal.rest} />
          <Transactions chainId={regenLocal.chainId} rest={regenLocal.rest} />
        </div>
      )}
    </div>
  )
}

export default RegenLocalPage
