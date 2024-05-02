import { Metadata } from 'next'

import Resolver from '@components/resolvers/Resolver'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ResolverPage = () => (
  <div className={styles.page}>
    <h1>{'data resolver'}</h1>
    <Resolver />
  </div>
)

export default ResolverPage
