import { Metadata } from 'next'

import Grants from '@components/grants/Grants'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora coop',
}

const GrantsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore grants'}</h1>
      <Grants />
    </div>
  </div>
)

export default GrantsPage
