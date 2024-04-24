import { Metadata } from 'next'

import Class from '@components/groups/classes/Class'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const ClassPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group credit class'}</h1>
      <Class />
    </div>
  </div>
)

export default ClassPage
