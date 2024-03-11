import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coops',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore all groups'}</h1>
    </div>
  </div>
)

export default HomePage
