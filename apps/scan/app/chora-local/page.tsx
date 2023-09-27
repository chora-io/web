'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import { choraLocal } from 'chora/chains'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'
import Account from '@components/chain/account/Account'
import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: choraLocal.chainId,
// }

const ChoraLocalPage = () => {
  const searchParams = useSearchParams()

  const address = searchParams.get('address')
  const tx = searchParams.get('tx')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{choraLocal.chainName}</h1>
        </div>
        <div>
          <h3>{`(${choraLocal.chainId})`}</h3>
        </div>
      </div>
      {address && (
        <div className={styles.content}>
          <Account rest={choraLocal.rest} address={address} />
        </div>
      )}
      {tx && (
        <div className={styles.content}>
          <Transaction rest={choraLocal.rest} tx={tx} />
        </div>
      )}
      {!address && !tx && (
        <div className={styles.content}>
          <Validators rest={choraLocal.rest} />
          <Accounts chainId={choraLocal.chainId} rest={choraLocal.rest} />
          <Transactions chainId={choraLocal.chainId} rest={choraLocal.rest} />
        </div>
      )}
    </div>
  )
}

export default ChoraLocalPage
