import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora | data management',
}

const HomePage = () => (
  <div className={styles.page} style={{ alignItems: 'center' }}>
    <div>
      <h1>{'data management'}</h1>
    </div>
  </div>
)

export default HomePage
