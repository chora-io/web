import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import Class from '@components/groups/classes/Class'
import Issuers from '@components/groups/classes/Issuers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const ClassPage = () => (
  <div className={styles.page}>
    <Breadcrumb text="classes" />
    <h1>{'group credit class'}</h1>
    <Class />
    <h1>{'class issuers'}</h1>
    <Issuers />
  </div>
)

export default ClassPage
