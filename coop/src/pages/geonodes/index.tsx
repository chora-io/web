import * as React from "react"

import Main from "../../layouts/Main"
import Geonode from "../../components/geonodes/Geonode"
import Geonodes from "../../components/geonodes/Geonodes"
import Seo from "../../components/SeoWrapper"

import * as styles from "./index.module.css"

const GeonodesPage = ({ location }) => {

  const urlParams = new URLSearchParams(location["search"])
  const nodeId = urlParams.get("id")

  return (
    <Main>
      <div className={styles.page}>
        {nodeId ? (
          <div>
            <h1>
              {"geonode"}
            </h1>
            <div className={styles.section}>
              <Geonode
                nodeId={nodeId}
              />
            </div>
          </div>
        ) : (
          <div>
            <h1>
              {"geonodes"}
            </h1>
            <div className={styles.section}>
              <Geonodes />
            </div>
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default GeonodesPage
