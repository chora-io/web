'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import Authz from "@components/Authz"
import Feegrant from "@components/Feegrant"
import Member from "@components/members/Member"
import Members from "@components/members/Members"
import MembersNav from "@components/members/MembersNav"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'members',
// }

const MembersPage = () => {

  const searchParams = useSearchParams()
  const memberAddress = searchParams.get("address")

  return (
    <div className={styles.page}>
      {!memberAddress ? (
        <div>
          <h1>
            {"group members"}
          </h1>
          <MembersNav />
          <Members />
        </div>
      ) : (
        <div>
          <h1>
            {"group member"}
          </h1>
          <Member
            memberAddress={memberAddress}
          />
          <h1>
            {"authorizations"}
          </h1>
          <Authz
            address={memberAddress}
          />
          <h1>
            {"fee allowances"}
          </h1>
          <Feegrant
            address={memberAddress}
          />
        </div>
      )}
    </div>
  )
}

export default MembersPage
