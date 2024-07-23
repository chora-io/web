import { Metadata } from 'next'

import Validator from '@components/network/Validator'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ValidatorPage = () => (
  <div className={styles.page}>
    <h1>{'network validator'}</h1>
    <Validator />
  </div>
)

export default ValidatorPage
