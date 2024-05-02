import { Metadata } from 'next'

import Class from '@components/classes/Class'
import Issuers from '@components/classes/Issuers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClassPage = () => (
  <div className={styles.page}>
    <h1>{'credit class'}</h1>
    <Class />
    <h1>{'class issuers'}</h1>
    <Issuers />
  </div>
)

export default ClassPage
