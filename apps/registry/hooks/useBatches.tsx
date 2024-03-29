import { useEffect, useState } from 'react'

const queryBatches = 'regen/ecocredit/v1/batches'

// fetch credit batches from selected network
export const useBatches = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [batches, setBatches] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBatches(null)
  }, [chainInfo?.chainId])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit batches from selected network
    const fetchBatches = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`
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
  }, [chainInfo?.rest, limit, offset])

  return [batches, error]
}
