import { Metadata } from 'next'

import Auth from '@components/Auth'
import Email from '@components/Email'
import Login from '@components/Login'
import Keplr from '@components/Keplr'
import Switch from '@components/Switch'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'user | account',
}

const AccountPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'user account'}</h1>
      <Switch />
      <Auth />
      <Keplr />
      <Email />
      <Login />
    </div>
  </div>
)

export default AccountPage
