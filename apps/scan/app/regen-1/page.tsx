import { regenMainnet } from 'cosmos/chains'
import { Metadata } from 'next'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${regenMainnet.chainId}`,
}

const RegenMainnetHomePage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1>{regenMainnet.chainName}</h1>
      </div>
      <div>
        <h3>{`(${regenMainnet.chainId})`}</h3>
      </div>
    </div>
    <div className={styles.content}>
      <Validators rest={regenMainnet.rest} />
      <Accounts chainId={regenMainnet.chainId} rest={regenMainnet.rest} />
      <Transactions chainId={regenMainnet.chainId} rest={regenMainnet.rest} />
    </div>
  </div>
)

export default RegenMainnetHomePage
