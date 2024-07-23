import { Metadata } from 'next'

import Validators from '@components/network/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const NetworkPage = () => (
  <div className={styles.page}>
    <h1>{'validators'}</h1>
    <Validators />
  </div>
)

export default NetworkPage
