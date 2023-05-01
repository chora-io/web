import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgAttest from "../../../components/data/attest/MsgAttest"
import QueryAttestationsByAttestor from "../../../components/data/attest/QueryAttestationsByAttestor"
import QueryAttestationsByHash from "../../../components/data/attest/QueryAttestationsByHash"
import QueryAttestationsByIRI from "../../../components/data/attest/QueryAttestationsByIRI"

import * as styles from "./index.module.css"

const AttestPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <MsgAttest />
        <QueryAttestationsByAttestor />
        <QueryAttestationsByIRI />
        <QueryAttestationsByHash />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default AttestPage
