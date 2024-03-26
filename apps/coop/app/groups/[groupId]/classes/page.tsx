import { Metadata } from 'next'

import Classes from '@components/groups/classes/Classes'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const EcocreditsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group credit classes'}</h1>
      <Classes />
    </div>
  </div>
)

export default EcocreditsPage
