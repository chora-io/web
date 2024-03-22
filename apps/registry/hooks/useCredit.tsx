import { useEffect, useState } from 'react'

const queryBatch = 'regen/ecocredit/v1/batch'

// fetch batch and batch metadata from selected network and network server
export const useCredit = (chainInfo: any, denom: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [batch, setBatch] = useState<any>(null)

  // reset state on network, server, or denom change
  useEffect(() => {
    setError(null)
    setBatch(null)
  }, [chainInfo?.chainId, denom])

  // fetch on load and network or denom change
  useEffect(() => {
    // fetch batch by denom from selected network
    const fetchBatch = async () => {
      await fetch(chainInfo.rest + '/' + queryBatch + '/' + denom)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBatch(res.batch)
          }
        })
    }

    // only fetch if network and denom
    if (chainInfo?.rest && denom) {
      fetchBatch().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, denom])

  return [batch, error]
}
