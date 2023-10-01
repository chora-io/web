import { bionLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${bionLocal.chainId}`,
}

const BionLocalHomePage = () => (
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
      <Validators rest={bionLocal.rest} />
      <Accounts chainId={bionLocal.chainId} rest={bionLocal.rest} />
      <Transactions chainId={bionLocal.chainId} rest={bionLocal.rest} />
    </div>
  </div>
)

export default BionLocalHomePage
