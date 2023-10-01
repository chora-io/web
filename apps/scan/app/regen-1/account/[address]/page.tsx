import { regenMainnet } from 'cosmos/chains'
import { Metadata } from 'next'

import Account from '@components/chain/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${regenMainnet.chainId}`,
}

const RegenMainnetAccountPage = () => (
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
      <Account rest={regenMainnet.rest} />
    </div>
  </div>
)

export default RegenMainnetAccountPage
