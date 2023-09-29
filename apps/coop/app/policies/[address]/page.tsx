'use client'

// import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import Authz from '@components/Authz'
import Feegrant from '@components/Feegrant'
import Policy from '@components/policies/Policy'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'policy',
// }

const PolicyPage = () => {
  const { address } = useParams()

  // TODO: valid address, otherwise error

  return (
    <div className={styles.page}>
      <div>
        <h1>{'group policy'}</h1>
        <Policy policyAddress={address} />
        <h1>{'authorizations'}</h1>
        <Authz address={address} />
        <h1>{'fee allowances'}</h1>
        <Feegrant address={address} />
      </div>
    </div>
  )
}

export default PolicyPage
