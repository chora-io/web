import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"

import * as styles from "./index.module.css"

const NotFound = () => (
  <Main>
    <div className={styles.container}>
      <div className={styles.banner}>
        <div>
          <h1>
            {'404'}
          </h1>
          <h2>
            {'a placeless place'}
          </h2>
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="404 | a placeless place" />

export default NotFound
