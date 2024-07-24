import { Metadata } from 'next'

import ChainInfo from '@components/network/ChainInfo'
import LatestBlock from '@components/network/LatestBlock'
import NodeInfo from '@components/network/NodeInfo'
import AppInfo from '@components/network/AppInfo'
import { NetworkContextProvider } from '@contexts/NetworkContext'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const NetworkPage = () => (
  <NetworkContextProvider>
    <div className={styles.page}>
      <h1>{'chain info'}</h1>
      <ChainInfo />
      <h1>{'latest block'}</h1>
      <LatestBlock />
      <h1>{'application info'}</h1>
      <AppInfo />
      <h1>{'connected node'}</h1>
      <NodeInfo />
    </div>
  </NetworkContextProvider>
)

export default NetworkPage
