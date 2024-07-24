import { Metadata } from 'next'

import LatestBlock from '@components/network/LatestBlock'
import { NetworkContextProvider } from '@contexts/NetworkContext'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const NetworkPage = () => (
  <NetworkContextProvider>
    <div className={styles.page}>
      <h1>{'latest block'}</h1>
      <LatestBlock />
    </div>
  </NetworkContextProvider>
)

export default NetworkPage
