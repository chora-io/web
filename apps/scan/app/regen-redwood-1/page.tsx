import { regenRedwood } from 'cosmos/chains'
import { Metadata } from 'next'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${regenRedwood.chainId}`,
}

const RegenRedwoodHomePage = () => (
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
      <Validators rest={regenRedwood.rest} />
      <Accounts chainId={regenRedwood.chainId} rest={regenRedwood.rest} />
      <Transactions chainId={regenRedwood.chainId} rest={regenRedwood.rest} />
    </div>
  </div>
)

export default RegenRedwoodHomePage
