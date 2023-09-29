'use client'

// import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import Authz from '@components/Authz'
import Feegrant from '@components/Feegrant'
import Member from '@components/members/Member'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'members',
// }

const MembersPage = () => {
  const { address } = useParams()

  // TODO: valid address, otherwise error

  return (
    <div className={styles.page}>
      <div>
        <h1>{'group member'}</h1>
        <Member memberAddress={address} />
        <h1>{'authorizations'}</h1>
        <Authz address={address} />
        <h1>{'fee allowances'}</h1>
        <Feegrant address={address} />
      </div>
    </div>
  )
}

export default MembersPage
