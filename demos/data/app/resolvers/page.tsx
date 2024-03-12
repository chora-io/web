import { Metadata } from 'next'

import DataResolvers from '@components/resolvers/DataResolvers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ResolversPage = () => (
  <div className={styles.page}>
    <div>
      <DataResolvers />
    </div>
  </div>
)

export default ResolversPage
