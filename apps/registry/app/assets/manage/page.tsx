import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AssetsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'manage ecological assets'}</h1>
    </div>
  </div>
)

export default AssetsPage
