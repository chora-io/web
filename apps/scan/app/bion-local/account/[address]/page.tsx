import { bionLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Account from '@components/chain/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${bionLocal.chainId}`,
}

const BionLocalAccountPage = () => (
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
      <Account rest={bionLocal.rest} />
    </div>
  </div>
)

export default BionLocalAccountPage
