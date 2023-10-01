import { bionLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${bionLocal.chainId}`,
}

const BionLocalTxPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1>{bionLocal.chainName}</h1>
      </div>
      <div>
        <h3>{`(${bionLocal.chainId})`}</h3>
      </div>
    </div>
    <div className={styles.content}>
      <Transaction rest={bionLocal.rest} />
    </div>
  </div>
)

export default BionLocalTxPage
