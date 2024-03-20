import { useEffect, useState } from 'react'

const queryGeonodes = 'chora/geonode/v1/nodes'

// fetch nodes (curated by coop) from selected network
export const useGeonodes = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [nodes, setNodes] = useState<any>(null)

  // reset state on network change
  useEffect(() => {
    setError(null)
    setNodes(null)
  }, [chainInfo?.chainId])

  // fetch on load and network change
  useEffect(() => {
    // fetch policies and nodes from selected network
    const fetchGeonodes = async () => {
      // fetch nodes by curator address from selected network
      await fetch(chainInfo.rest + '/' + queryGeonodes)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setNodes(res['nodes'])
          }
        })
    }

    // only fetch if network
    if (chainInfo?.rest) {
      fetchGeonodes().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [nodes, error]
}
