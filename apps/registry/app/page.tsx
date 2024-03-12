import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'ecological registry workspace'}</h1>
    </div>
  </div>
)

export default HomePage
