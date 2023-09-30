import { Metadata } from 'next'

import Authz from '@components/Authz'
import Feegrant from '@components/Feegrant'
import Policy from '@components/policies/Policy'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'coop | policy',
}

const PolicyPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'group policy'}</h1>
      <Policy />
      <h1>{'authorizations'}</h1>
      <Authz />
      <h1>{'fee allowances'}</h1>
      <Feegrant />
    </div>
  </div>
)

export default PolicyPage
