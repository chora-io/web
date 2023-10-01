import { regenRedwood } from 'cosmos/chains'
import { Metadata } from 'next'

import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${regenRedwood.chainId}`,
}

const RegenRedwoodTxPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1>{regenRedwood.chainName}</h1>
      </div>
      <div>
        <h3>{`(${regenRedwood.chainId})`}</h3>
      </div>
    </div>
    <div className={styles.content}>
      <Transaction rest={regenRedwood.rest} />
    </div>
  </div>
)

export default RegenRedwoodTxPage
