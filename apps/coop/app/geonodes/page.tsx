'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import Geonode from "@components/geonodes/Geonode"
import Geonodes from "@components/geonodes/Geonodes"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'geonodes',
// }

const GeonodesPage = () => {

  const searchParams = useSearchParams()
  const nodeId = searchParams.get("id")

  return (
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
  )
}

export default GeonodesPage
