import { useEffect, useState } from 'react'

const queryNode = 'chora/geonode/v1/node'

// fetch node and node metadata from selected network and network server
export const useGeonode = (chainInfo: any, nodeId: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [node, setNode] = useState<any>(null)

  // reset state on network, server, or node id change
  useEffect(() => {
    setError(null)
    setNode(null)
  }, [chainInfo?.chainId, nodeId])

  // fetch on load and network or node id change
  useEffect(() => {
    // fetch node by node id from selected network
    const fetchNode = async () => {
      await fetch(chainInfo.rest + '/' + queryNode + '/' + nodeId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setNode(res)
          }
        })
    }

    // only fetch if network and node id
    if (chainInfo?.rest && nodeId) {
      fetchNode().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, nodeId])

  return [node, error]
}
