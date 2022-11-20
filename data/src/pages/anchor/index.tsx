import * as React from 'react';

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import * as styles from "./index.module.css"

const Anchor = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"anchor data"}
            </div>
            <div>
              {"..."}
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search anchors"}
            </div>
            <div>
              {"..."}
            </div>
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Anchor
