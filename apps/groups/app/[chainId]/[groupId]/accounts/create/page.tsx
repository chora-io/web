import { Breadcrumb } from 'chora/components'
import { Metadata } from 'next'

import CreateAccount from '@components/groups/accounts/CreateAccount'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const CreatePage = () => (
  <div className={styles.page}>
    <Breadcrumb text="accounts" />
    <h1>{'create account'}</h1>
    <CreateAccount />
  </div>
)

export default CreatePage
