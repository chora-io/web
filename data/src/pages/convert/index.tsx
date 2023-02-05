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
        <ConvertHashToIRI />
        <ConvertIRIToHash />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default ConvertPage
