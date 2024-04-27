import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Resolver from '@components/groups/resolvers/Resolver'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const ResolverPage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="← resolvers" />
      <h1>{'group data resolver'}</h1>
      <Resolver />
    </div>
  </div>
)

export default ResolverPage
