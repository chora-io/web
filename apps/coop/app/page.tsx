import { Metadata } from 'next'

import Group from '@components/home/Group'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'coop | home',
}

const HomePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group information'}</h1>
      <Group />
    </div>
  </div>
)

export default HomePage
