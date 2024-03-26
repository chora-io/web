import { Metadata } from 'next'

import CreateAccount from '@components/groups/accounts/CreateAccount'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'create group account'}</h1>
      <CreateAccount />
    </div>
  </div>
)

export default CreatePage
