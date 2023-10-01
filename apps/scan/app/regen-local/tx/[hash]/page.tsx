import { regenLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${regenLocal.chainId}`,
}

const RegenLocalTxPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1>{regenLocal.chainName}</h1>
      </div>
      <div>
        <h3>{`(${regenLocal.chainId})`}</h3>
      </div>
    </div>
    <div className={styles.content}>
      <Transaction rest={regenLocal.rest} />
    </div>
  </div>
)

export default RegenLocalTxPage
