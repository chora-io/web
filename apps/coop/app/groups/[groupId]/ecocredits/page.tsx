import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const EcocreditsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group ecocredits'}</h1>
    </div>
  </div>
)

export default EcocreditsPage
