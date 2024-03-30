import { ConnectWallet, Faucet } from 'chora/components'
import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora faucet',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <ConnectWallet testnets={true} />
      <Faucet />
    </div>
  </div>
)

export default HomePage
