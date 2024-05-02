import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import CreateGroup from '@components/groups/CreateGroup'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const CreatePage = () => (
  <div className={styles.page}>
    <Breadcrumb text="groups" />
    <h1>{'create group'}</h1>
    <CreateGroup />
  </div>
)

export default CreatePage
