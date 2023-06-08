import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const NotFoundPage = () => (
  <Main withBackground={true}>
    <div className={styles.page}>
      <div>
        <h1>
          {'404'}
        </h1>
        <h2>
          {'a placeless place'}
        </h2>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="404 | a placeless place" />

export default NotFoundPage
