import { Metadata } from 'next'

import ModuleInfo from '@components/modules/cosmos.auth.v1beta1/ModuleInfo'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <h1>{'cosmos.auth.v1beta1'}</h1>
    <ModuleInfo />
  </div>
)

export default ModulePage
