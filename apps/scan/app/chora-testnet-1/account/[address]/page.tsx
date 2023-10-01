import { choraTestnet } from 'cosmos/chains'
import { Metadata } from 'next'

import Account from '@components/chain/account/Account'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${choraTestnet.chainId}`,
}

const ChoraTestnetAccountPage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <div>
        <h1>{choraTestnet.chainName}</h1>
      </div>
      <div>
        <h3>{`(${choraTestnet.chainId})`}</h3>
      </div>
    </div>
    <div className={styles.content}>
      <Account rest={choraTestnet.rest} />
    </div>
  </div>
)

export default ChoraTestnetAccountPage
