import { regenRedwood } from 'cosmos/chains'
import { Metadata } from 'next'

import Account from '@components/chain/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${regenRedwood.chainId}`,
}

const RegenRedwoodAccountPage = () => (
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
      <Account rest={regenRedwood.rest} />
    </div>
  </div>
)

export default RegenRedwoodAccountPage
