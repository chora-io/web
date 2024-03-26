import { Metadata } from 'next'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const ResolversPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group resolvers'}</h1>
    </div>
  </div>
)

export default ResolversPage
