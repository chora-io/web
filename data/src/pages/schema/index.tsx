import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import GenerateHash from "../../components/schema/GenerateHash"

import * as styles from "./index.module.css"

const HashPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <GenerateHash />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default HashPage
