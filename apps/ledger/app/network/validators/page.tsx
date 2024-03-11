import { Metadata } from 'next'

import Validators from '@components/network/Validators'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const NetworkValidatorsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'network validators'}</h1>
      <Validators />
    </div>
  </div>
)

export default NetworkValidatorsPage
