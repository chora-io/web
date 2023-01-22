import * as React from "react"

import Main from "../../layouts/Main"
import Member from "../../components/members/Member"
import Members from "../../components/members/Members"
import Seo from "../../components/SeoWrapper"

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
            <div className={styles.section}>
              <Member memberAddress={memberAddress} />
            </div>
          </div>
        ) : (
          <div>
            <h1>
              {"group members"}
            </h1>
            <div className={styles.section}>
              <Members />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default MembersPage
