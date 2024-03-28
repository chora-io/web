import { Metadata } from 'next'

import Claims from '@components/claims/Claims'
import ClaimsNav from '@components/claims/ClaimsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClaimsPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'explore data claims'}</h1>
      <ClaimsNav />
      <Claims />
    </div>
  </div>
)

export default ClaimsPage
