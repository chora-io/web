import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import ConvertHashToIRI from "../../components/convert/ConvertHashToIRI"
import ConvertIRIToHash from "../../components/convert/ConvertIRIToHash"

import * as styles from "./index.module.css"

const ConvertPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <div className={styles.section}>
          <div>
            {"convert content hash to IRI"}
          </div>
          <ConvertHashToIRI />
        </div>
        <div className={styles.section}>
          <div>
            {"convert IRI to content hash"}
          </div>
          <ConvertIRIToHash />
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ConvertPage
