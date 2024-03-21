'use client'

import GeonodesListItem from '@components/geonodes/GeonodesListItem'

const GeonodesList = ({ nodes }: any) => {
  return (
    <>
      {nodes &&
        nodes.map((node: any) => (
          <GeonodesListItem key={node.id} node={node} />
        ))}
    </>
  )
}

export default GeonodesList
