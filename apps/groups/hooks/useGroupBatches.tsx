import { useEffect, useState } from 'react'

const queryBatches = 'regen/ecocredit/v1/batches-by-issuer'

// fetch credit batches issued by group from selected network
export const useGroupBatches = (chainInfo: any, policies: any[]) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [batches, setBatches] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBatches(null)
  }, [chainInfo?.rest, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit batches from selected network
    const fetchBatches = async () => {
      const bs: any[] = []

      // create promise for all async fetch calls
      const promise = policies.map(async (policy) => {
        // fetch credit batches by issuer address from selected network
        await fetch(chainInfo.rest + '/' + queryBatches + '/' + policy.address)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res.batches.map((n: any) =>
                bs.push({ issuer: policy.address, ...n }),
              )
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setBatches(bs)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchBatches().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [batches, error]
}
