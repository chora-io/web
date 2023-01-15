import * as React from "react"

import Background from "chora/components/Background"

import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const NotFound = () => (
  <>
    <Background />
    <div className={styles.page}>
      <div className={styles.content}>
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
  </>
)

export const Head = () => <Seo title="404 | a placeless place" />

export default NotFound
