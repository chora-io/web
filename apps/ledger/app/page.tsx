import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'blockchain network dashboard'}</h1>
    </div>
  </div>
)

export default HomePage
