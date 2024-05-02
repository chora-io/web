import { Metadata } from 'next'

import Claims from '@components/claims/Claims'
import ClaimsNav from '@components/claims/ClaimsNav'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClaimsPage = () => (
  <div className={styles.page}>
    <h1>{'explore data claims'}</h1>
    <ClaimsNav />
    <Claims />
  </div>
)

export default ClaimsPage
