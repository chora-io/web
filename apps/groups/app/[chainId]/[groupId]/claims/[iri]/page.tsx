import { Metadata } from 'next'

import Claims from '@components/groups/claims/Claims'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const ClaimsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group data claim'}</h1>
      <Claims />
    </div>
  </div>
)

export default ClaimsPage
