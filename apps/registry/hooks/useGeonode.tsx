import { useEffect, useState } from 'react'

const queryNode = 'chora/geonode/v1/node'

// fetch node by id from selected network
export const useGeonode = (chainInfo: any, nodeId: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [node, setNode] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setNode(null)
  }, [chainInfo?.chainId, nodeId])

  // fetch on load and param change
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

    // only fetch if params available
    if (chainInfo?.rest && nodeId) {
      fetchNode().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, nodeId])

  return [node, error]
}
