import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import QueryGroup from "../../../components/group/query/QueryGroup"
import QueryGroupMembers from "../../../components/group/query/QueryGroupMembers"
import QueryGroupPolicy from "../../../components/group/query/QueryGroupPolicy"
import QueryProposal from "../../../components/group/query/QueryProposal"

import * as styles from "./index.module.css"

const GroupQueryPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <QueryGroup />
        <QueryGroupMembers />
        <QueryGroupPolicy />
        <QueryProposal />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default GroupQueryPage
