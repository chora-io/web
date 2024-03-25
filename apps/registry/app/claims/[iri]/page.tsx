import { Metadata } from 'next'

import Attestations from '@components/claims/Attestations'
import Claim from '@components/claims/Claim'
import Resolvers from '@components/claims/Resolvers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClaimPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'data claim'}</h1>
      <Claim />
      <h1>{'data registration'}</h1>
      <Resolvers />
      <h1>{'data attestations'}</h1>
      <Attestations />
    </div>
  </div>
)

export default ClaimPage
