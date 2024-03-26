import { Metadata } from 'next'

import UpdateGroupAdmin from '@components/groups/UpdateGroupAdmin'
import UpdateGroupMetadata from '@components/groups/UpdateGroupMetadata'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const UpdatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'update admin'}</h1>
      <UpdateGroupAdmin />
      <h1>{'update metadata'}</h1>
      <UpdateGroupMetadata />
    </div>
  </div>
)

export default UpdatePage
