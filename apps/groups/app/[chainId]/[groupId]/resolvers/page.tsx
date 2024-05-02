import { Metadata } from 'next'

import Resolvers from '@components/groups/resolvers/Resolvers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const ResolversPage = () => (
  <div className={styles.page}>
    <h1>{'group data resolvers'}</h1>
    <Resolvers />
  </div>
)

export default ResolversPage
