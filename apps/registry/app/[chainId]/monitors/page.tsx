import { Metadata } from 'next'

import Monitors from '@components/monitors/Monitors'
import MonitorsNav from '@components/monitors/MonitorsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const MonitorsPage = () => (
  <div className={styles.page}>
    <h1>{'explore monitors'}</h1>
    <MonitorsNav />
    <Monitors />
  </div>
)

export default MonitorsPage
