import { Metadata } from 'next'

import CreateGroup from '@components/groups/CreateGroup'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'create group'}</h1>
      <CreateGroup />
    </div>
  </div>
)

export default CreatePage
