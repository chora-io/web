import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'coming soon...'}</h1>
    </div>
  </div>
)

export default HomePage
