import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora base',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'demo application'}</h1>
    </div>
  </div>
)

export default HomePage
