import { Metadata } from 'next'

import ChainInfo from '@components/network/ChainInfo'
import LatestBlock from '@components/network/LatestBlock'
import NodeInfo from '@components/network/NodeInfo'
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
      <h1>{'node info'}</h1>
      <NodeInfo />
      <h1>{'latest block'}</h1>
      <LatestBlock />
    </div>
  </NetworkContextProvider>
)

export default NetworkPage
