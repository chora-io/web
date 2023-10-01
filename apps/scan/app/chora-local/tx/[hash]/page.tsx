import { choraLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Transaction from '@components/chain/transaction/Transaction'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${choraLocal.chainId}`,
}

const ChoraLocalTxPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1>{choraLocal.chainName}</h1>
      </div>
      <div>
        <h3>{`(${choraLocal.chainId})`}</h3>
      </div>
    </div>
    <div className={styles.content}>
      <Transaction rest={choraLocal.rest} />
    </div>
  </div>
)

export default ChoraLocalTxPage
