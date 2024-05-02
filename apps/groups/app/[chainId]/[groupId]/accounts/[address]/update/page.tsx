import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import UpdateAccountAdmin from '@components/groups/accounts/UpdateAccountAdmin'
import UpdateAccountMetadata from '@components/groups/accounts/UpdateAccountMetadata'
import UpdateAccountPolicy from '@components/groups/accounts/UpdateAccountPolicy'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const UpdatePage = () => (
  <div className={styles.page}>
    <Breadcrumb text="account" />
    <h1>{'update admin'}</h1>
    <UpdateAccountAdmin />
    <h1>{'update metadata'}</h1>
    <UpdateAccountMetadata />
    <h1>{'update policy'}</h1>
    <UpdateAccountPolicy />
  </div>
)

export default UpdatePage
