import { Metadata } from 'next'

import Monitors from '@components/groups/monitors/Monitors'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const MonitorsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group monitors'}</h1>
      <Monitors />
    </div>
  </div>
)

export default MonitorsPage
