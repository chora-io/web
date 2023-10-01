import { regenLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Account from '@components/chain/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${regenLocal.chainId}`,
}

const RegenLocalAccountPage = () => (
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
      <Account rest={regenLocal.rest} />
    </div>
  </div>
)

export default RegenLocalAccountPage
