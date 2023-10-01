import { choraLocal } from 'cosmos/chains'
import { Metadata } from 'next'

import Accounts from '@components/chain/Accounts'
import Transactions from '@components/chain/Transactions'
import Validators from '@components/chain/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `scan | ${choraLocal.chainId}`,
}

const ChoraLocalHomePage = () => (
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
      <Validators rest={choraLocal.rest} />
      <Accounts chainId={choraLocal.chainId} rest={choraLocal.rest} />
      <Transactions chainId={choraLocal.chainId} rest={choraLocal.rest} />
    </div>
  </div>
)

export default ChoraLocalHomePage