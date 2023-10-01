import { regenLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${regenLocal.chainId}`,
}

const RegenLocalHomePage = () => (
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
      <Validators rest={regenLocal.rest} />
      <Accounts chainId={regenLocal.chainId} rest={regenLocal.rest} />
      <Transactions chainId={regenLocal.chainId} rest={regenLocal.rest} />
    </div>
  </div>
)

export default RegenLocalHomePage
