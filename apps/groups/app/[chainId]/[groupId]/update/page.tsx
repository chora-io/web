import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import UpdateGroupAdmin from '@components/groups/UpdateGroupAdmin'
import UpdateGroupMetadata from '@components/groups/UpdateGroupMetadata'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const UpdatePage = () => (
  <div className={styles.page}>
    <div>
      <Breadcrumb text="← group" />
      <h1>{'update admin'}</h1>
      <UpdateGroupAdmin />
      <h1>{'update metadata'}</h1>
      <UpdateGroupMetadata />
    </div>
  </div>
)

export default UpdatePage
