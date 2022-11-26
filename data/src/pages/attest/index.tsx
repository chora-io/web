import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import MsgAttest from "../../components/attest/MsgAttest"
import QueryAttestationsByAttestor from "../../components/attest/QueryAttestationsByAttestor"
import QueryAttestationsByIRI from "../../components/attest/QueryAttestationsByIRI"
import QueryAttestationsByHash from "../../components/attest/QueryAttestationsByHash"

import * as styles from "./index.module.css"

const Attest = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"attest to data"}
            </div>
            <MsgAttest />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search data attestations by attestor"}
            </div>
            <QueryAttestationsByAttestor />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search data attestations by iri"}
            </div>
            <QueryAttestationsByIRI />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search data attestations by content hash"}
            </div>
            <QueryAttestationsByHash />
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Attest
