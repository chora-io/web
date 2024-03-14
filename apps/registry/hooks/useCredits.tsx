import { useEffect, useState } from 'react'

const queryBatches = 'regen/ecocredit/v1/batches'

// fetch all credit batches from selected network
export const useCredits = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [batches, setBatches] = useState<any>(null)

  // reset state on network or group id change
  useEffect(() => {
    setError(null)
    setBatches(null)
  }, [chainInfo?.chainId])

  // fetch on load and network change
  useEffect(() => {
    // fetch credit batches from selected network
    const fetchBatches = async () => {

      // fetch policies by group id from selected network
      await fetch(chainInfo.rest + '/' + queryBatches)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBatches(res['batches'])
          }
        })
    }

    // only fetch if network and group id
    if (chainInfo?.rest) {
      fetchBatches().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [batches, error]
}
