import { Metadata } from 'next'

import Claim from '@components/claims/Claim'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClaimPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'data claim'}</h1>
      <Claim />
    </div>
  </div>
)

export default ClaimPage
