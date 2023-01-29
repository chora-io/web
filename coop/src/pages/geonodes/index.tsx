import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import Geonode from "../../components/geonodes/Geonode"
import Geonodes from "../../components/geonodes/Geonodes"

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
            <Geonode
              nodeId={nodeId}
            />
          </div>
        ) : (
          <div>
            <h1>
              {"geonodes"}
            </h1>
            <Geonodes />
          </div>
        )}
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default GeonodesPage
