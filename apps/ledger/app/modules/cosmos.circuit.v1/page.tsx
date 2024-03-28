import { Metadata } from 'next'

import ModuleInfo from '@components/modules/cosmos.circuit.v1/ModuleInfo'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'cosmos.circuit.v1'}</h1>
      <ModuleInfo />
    </div>
  </div>
)

export default ModulePage
