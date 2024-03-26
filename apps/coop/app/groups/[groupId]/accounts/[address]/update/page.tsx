import { Metadata } from 'next'

import UpdateAccountAdmin from '@components/groups/accounts/UpdateAccountAdmin'
import UpdateAccountMetadata from '@components/groups/accounts/UpdateAccountMetadata'
import UpdateAccountPolicy from '@components/groups/accounts/UpdateAccountPolicy'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const UpdatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'update account admin'}</h1>
      <UpdateAccountAdmin />
      <h1>{'update account metadata'}</h1>
      <UpdateAccountMetadata />
      <h1>{'update account policy'}</h1>
      <UpdateAccountPolicy />
    </div>
  </div>
)

export default UpdatePage
