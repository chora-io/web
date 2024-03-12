import { ConnectWallet, Faucet } from 'chora/components'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora faucet | token faucet',
}

const HomePage = () => (
  <>
    <div className={styles.page}>
      <div>
        <h1>{'token faucet'}</h1>
        <ConnectWallet testnets={true} />
        <Faucet />
      </div>
    </div>
    <div className={styles.mobile}>
      <p>{'This page is not supported on mobile devices.'}</p>
    </div>
  </>
)

export default HomePage
