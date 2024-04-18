import { Metadata } from 'next'

import ModuleInfo from '@components/modules/regen.ecocredit.basket.v1/ModuleInfo'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'regen.ecocredit.basket.v1'}</h1>
      <ModuleInfo />
    </div>
  </div>
)

export default ModulePage
