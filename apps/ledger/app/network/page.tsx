import { Metadata } from 'next'

import Network from '@components/network/Network'
import Validators from '@components/network/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const NetworkPage = () => (
  <div className={styles.page}>
    <div>
      <Network />
      <Validators />
    </div>
  </div>
)

export default NetworkPage
