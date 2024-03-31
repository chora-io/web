import { useEffect, useState } from 'react'

const queryGeonodes = 'chora/geonode/v1/nodes'

// fetch nodes from selected network
export const useGeonodes = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [nodes, setNodes] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setNodes(null)
  }, [chainInfo?.chainId])

  // fetch on load and param change
  useEffect(() => {
    // fetch nodes by curator address from selected network
    const fetchGeonodes = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`
      await fetch(chainInfo.rest + '/' + queryGeonodes + queryParams)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setNodes(res['nodes'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchGeonodes().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [nodes, error]
}
