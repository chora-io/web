import { ConnectWallet, Faucet } from 'chora/components'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora faucet | testnet token faucet',
}

const FaucetPage = () => (
  <>
    <div className={styles.page}>
      <div>
        <h1>{'testnet token faucet'}</h1>
        <ConnectWallet />
        <Faucet />
      </div>
    </div>
    <div className={styles.mobile}>
      <p>{'This page is not supported on mobile devices.'}</p>
    </div>
  </>
)

export default FaucetPage
