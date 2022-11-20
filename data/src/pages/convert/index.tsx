import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import ConvertHashToIRI from "../../components/convert/ConvertHashToIRI"
import ConvertIRIToHash from "../../components/convert/ConvertIRIToHash"

import * as styles from "./index.module.css"

const Convert = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"convert IRI to content hash"}
            </div>
            <ConvertIRIToHash />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"convert content hash to IRI"}
            </div>
            <ConvertHashToIRI />
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Convert
