import { Metadata } from 'next'

import Credits from '@components/credits/Credits'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreditsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore credit batches'}</h1>
      <Credits />
    </div>
  </div>
)

export default CreditsPage
