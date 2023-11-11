import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chat | home',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'chat example'}</h1>
    </div>
  </div>
)

export default HomePage
