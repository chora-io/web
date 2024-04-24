import { useEffect, useState } from 'react'

const queryBatch = 'regen/ecocredit/v1/batch'

// fetch credit batch by denom from selected network
export const useBatch = (chainInfo: any, denom: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [batch, setBatch] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBatch(null)
  }, [chainInfo?.rest, denom])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit batch from selected network
    const fetchBatch = async () => {
      // fetch credit batch by denom from selected network
      await fetch(chainInfo.rest + '/' + queryBatch + '/' + denom)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBatch(res['batch'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && denom) {
      fetchBatch().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, denom])

  return [batch, error]
}
