import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'user | home',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'user example'}</h1>
    </div>
  </div>
)

export default HomePage
