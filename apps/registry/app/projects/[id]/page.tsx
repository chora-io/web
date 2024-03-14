import { Metadata } from 'next'

import Class from '@components/classes/Class'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const ClassPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'class projects'}</h1>
      <Class />
    </div>
  </div>
)

export default ClassPage
