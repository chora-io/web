import { choraTestnet } from 'cosmos/chains'
import { Metadata } from 'next'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${choraTestnet.chainId}`,
}

const ChoraTestnetHomePage = () => (
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
      <Validators rest={choraTestnet.rest} />
      <Accounts chainId={choraTestnet.chainId} rest={choraTestnet.rest} />
      <Transactions chainId={choraTestnet.chainId} rest={choraTestnet.rest} />
    </div>
  </div>
)

export default ChoraTestnetHomePage
