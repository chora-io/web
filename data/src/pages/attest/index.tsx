import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import MsgAttest from "../../components/attest/MsgAttest"
import QueryAttestationsByAttestor from "../../components/attest/QueryAttestationsByAttestor"
import QueryAttestationsByIRI from "../../components/attest/QueryAttestationsByIRI"
import QueryAttestationsByHash from "../../components/attest/QueryAttestationsByHash"

import * as styles from "./index.module.css"

const Attest = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"attest to data"}
          </div>
          <MsgAttest />
        </div>
        <div className={styles.section}>
          <div>
            {"search data attestations by attestor"}
          </div>
          <QueryAttestationsByAttestor />
        </div>
        <div className={styles.section}>
          <div>
            {"search data attestations by iri"}
          </div>
          <QueryAttestationsByIRI />
        </div>
        <div className={styles.section}>
          <div>
            {"search data attestations by content hash"}
          </div>
          <QueryAttestationsByHash />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default Attest
