import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora | blockchain modules',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'blockchain modules'}</h1>
    </div>
  </div>
)

export default HomePage
