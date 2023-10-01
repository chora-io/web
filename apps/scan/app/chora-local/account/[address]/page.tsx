import { choraLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Account from '@components/chain/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${choraLocal.chainId}`,
}

const ChoraLocalAccountPage = () => (
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
      <Account rest={choraLocal.rest} />
    </div>
  </div>
)

export default ChoraLocalAccountPage
