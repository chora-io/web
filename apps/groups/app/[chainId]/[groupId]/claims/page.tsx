import { Metadata } from 'next'

import Claims from '@components/groups/claims/Claims'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora groups',
}

const ClaimsPage = () => (
  <div className={styles.page}>
    <h1>{'group data claims'}</h1>
    <Claims />
  </div>
)

export default ClaimsPage
