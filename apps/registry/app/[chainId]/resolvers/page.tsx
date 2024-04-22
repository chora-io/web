import { Metadata } from 'next'

import Resolvers from '@components/resolvers/Resolvers'
import ResolversNav from '@components/resolvers/ResolversNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ResolversPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore data resolvers'}</h1>
      <ResolversNav />
      <Resolvers />
    </div>
  </div>
)

export default ResolversPage
