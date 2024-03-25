import { Metadata } from 'next'

import Class from '@components/classes/Class'
import ClassIssuers from '@components/classes/ClassIssuers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClassPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'credit class'}</h1>
      <Class />
      <h1>{'class issuers'}</h1>
      <ClassIssuers />
    </div>
  </div>
)

export default ClassPage
