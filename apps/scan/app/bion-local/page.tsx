'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import { bionLocal } from 'chora/chains'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'
import Account from '@components/chain/account/Account'
import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: bionLocal.chainId,
// }

const BionLocalPage = () => {
  const searchParams = useSearchParams()

  const address = searchParams.get('address')
  const tx = searchParams.get('tx')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{bionLocal.chainName}</h1>
        </div>
        <div>
          <h3>{`(${bionLocal.chainId})`}</h3>
        </div>
      </div>
      {address && (
        <div className={styles.content}>
          <Account rest={bionLocal.rest} address={address} />
        </div>
      )}
      {tx && (
        <div className={styles.content}>
          <Transaction rest={bionLocal.rest} tx={tx} />
        </div>
      )}
      {!address && !tx && (
        <div className={styles.content}>
          <Validators rest={bionLocal.rest} />
          <Accounts chainId={bionLocal.chainId} rest={bionLocal.rest} />
          <Transactions chainId={bionLocal.chainId} rest={bionLocal.rest} />
        </div>
      )}
    </div>
  )
}

export default BionLocalPage
