import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const EcocreditPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'ecocredit classes'}</h1>
      <h1>{'ecocredit projects'}</h1>
      <h1>{'ecocredit batches'}</h1>
    </div>
  </div>
)

export default EcocreditPage
