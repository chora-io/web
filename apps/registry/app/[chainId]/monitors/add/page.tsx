import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import AddMonitor from '@components/monitors/AddMonitor'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const AddPage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="← monitors" />
      <h1>{'add monitor'}</h1>
      <AddMonitor />
    </div>
  </div>
)

export default AddPage
