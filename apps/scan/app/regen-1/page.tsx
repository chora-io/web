'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import { regenMainnet } from '../../../../packages/cosmos/chains'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'
import Account from '@components/chain/account/Account'
import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: regenMainnet.chainId,
// }

const RegenPage = () => {
  const searchParams = useSearchParams()

  const address = searchParams.get('address')
  const tx = searchParams.get('tx')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>{regenMainnet.chainName}</h1>
        </div>
        <div>
          <h3>{`(${regenMainnet.chainId})`}</h3>
        </div>
      </div>
      {address && (
        <div className={styles.content}>
          <Account rest={regenMainnet.rest} address={address} />
        </div>
      )}
      {tx && (
        <div className={styles.content}>
          <Transaction rest={regenMainnet.rest} tx={tx} />
        </div>
      )}
      {!address && !tx && (
        <div className={styles.content}>
          <Validators rest={regenMainnet.rest} />
          <Accounts chainId={regenMainnet.chainId} rest={regenMainnet.rest} />
          <Transactions
            chainId={regenMainnet.chainId}
            rest={regenMainnet.rest}
          />
        </div>
      )}
    </div>
  )
}

export default RegenPage
