import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Authz from "../../components/Authz"
import Feegrant from "../../components/Feegrant"
import Member from "../../components/members/Member"
import Members from "../../components/members/Members"

import * as styles from "./index.module.css"

const MembersPage = ({ location }) => {

  const urlParams = new URLSearchParams(location["search"])
  const memberAddress = urlParams.get("address")

  return (
    <Main>
      <div className={styles.page}>
        {memberAddress ? (
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
        ) : (
          <div>
            <h1>
              {"group members"}
            </h1>
            <Members />
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default MembersPage
