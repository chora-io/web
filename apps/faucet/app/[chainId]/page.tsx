import { Metadata } from 'next'

import ConnectWallet from '@components/ConnectWallet'
import SubmitRequest from '@components/SubmitRequest'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora faucet',
}

const FaucetPage = () => (
  <div className={styles.page}>
    <div>
      <ConnectWallet testnetsOnly={true} />
      <SubmitRequest />
    </div>
  </div>
)

export default FaucetPage
