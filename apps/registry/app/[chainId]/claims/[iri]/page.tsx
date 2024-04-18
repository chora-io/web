import { Metadata } from 'next'

import Attestations from '@components/claims/Attestations'
import Anchor from '@components/claims/Anchor'
import Resolved from '@components/claims/Resolved'
import Resolvers from '@components/claims/Resolvers'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const ClaimPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'data anchor'}</h1>
      <Anchor />
      <h1>{'data resolved'}</h1>
      <Resolved />
      <h1>{'data resolvers'}</h1>
      <Resolvers />
      <h1>{'data attestations'}</h1>
      <Attestations />
    </div>
  </div>
)

export default ClaimPage
