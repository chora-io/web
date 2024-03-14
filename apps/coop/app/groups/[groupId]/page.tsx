import { Metadata } from 'next'

import Group from '@components/groups/Group'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const GroupPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group overview'}</h1>
      <Group />
    </div>
  </div>
)

export default GroupPage
