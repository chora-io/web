import { Metadata } from 'next'

import Chains from '@components/home/Chains'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora | network scanner',
}

const HomePage = () => (
  <div className={styles.page}>
    <div className={styles.header}>
      <h1>{'network scanner'}</h1>
    </div>
    <div className={styles.content}>
      <Chains />
    </div>
  </div>
)

export default HomePage
