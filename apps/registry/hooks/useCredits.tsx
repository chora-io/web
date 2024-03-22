import { useEffect, useState } from 'react'

const queryBatches = 'regen/ecocredit/v1/batches'

// fetch all credit batches from selected network
export const useCredits = (
  chainInfo: any,
  maxItems: number,
  offset: number,
) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [batches, setBatches] = useState<any>(null)

  // reset state on network change
  useEffect(() => {
    setError(null)
    setBatches(null)
  }, [chainInfo?.chainId])

  // fetch on load and network change
  useEffect(() => {
    // fetch credit batches from selected network
    const fetchBatches = async () => {
      const queryParams = `?pagination.limit=${maxItems}&pagination.offset=${offset}`

      // fetch credit batches from selected network
      await fetch(chainInfo.rest + '/' + queryBatches + queryParams)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBatches(res['batches'])
          }
        })
    }

    // only fetch if network
    if (chainInfo?.rest) {
      fetchBatches().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, maxItems, offset])

  return [batches, error]
}
