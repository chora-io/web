import { useEffect, useState } from 'react'

const queryAttestations = 'regen/data/v1/attestations-by-attestor'

// fetch data attestations by group from selected network
export const useGroupAttestations = (chainInfo: any, policies: any[]) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [attestations, setAttestations] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setAttestations(null)
  }, [chainInfo?.rest, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // fetch data attestations from selected network
    const fetchAttestations = async () => {
      const as: any[] = []

      // create promise for all async fetch calls
      const promise = policies.map(async (policy) => {
        // fetch data attestations by attestor address from selected network
        await fetch(
          chainInfo.rest + '/' + queryAttestations + '/' + policy.address,
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res['attestations'].map((n: any) =>
                as.push({ attestor: policy.address, ...n }),
              )
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setAttestations(as)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchAttestations().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [attestations, error]
}
