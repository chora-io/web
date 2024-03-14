import { Metadata } from 'next'

import Classes from '@components/classes/Classes'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClassesPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'credit classes'}</h1>
      <Classes />
    </div>
  </div>
)

export default ClassesPage
