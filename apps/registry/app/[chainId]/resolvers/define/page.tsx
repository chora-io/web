import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import DefineResolver from '@components/resolvers/DefineResolver'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const DefinePage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="resolvers" />
      <h1>{'define resolver'}</h1>
      <DefineResolver />
    </div>
  </div>
)

export default DefinePage
