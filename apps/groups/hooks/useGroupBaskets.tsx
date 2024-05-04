import { useEffect, useState } from 'react'

// TODO(regen-ledger): query baskets by curator with pagination
const queryBaskets = 'regen/ecocredit/basket/v1/baskets'

// fetch credit baskets curated by group from selected network
export const useGroupBaskets = (chainInfo: any, policies: any[]) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [baskets, setBaskets] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBaskets(null)
  }, [chainInfo?.rest, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit baskets from selected network
    const fetchBaskets = async () => {
      let bs: any[] = []

      // TODO(regen-ledger): query baskets by curator with pagination
      await fetch(chainInfo.rest + '/' + queryBaskets)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            if (policies) {
              policies.map((policy: any) => {
                res['baskets_info'].map((basket: any) => {
                  if (policy.address === basket.curator) {
                    bs.push(basket)
                  }
                })
              })
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })

      setBaskets(bs)
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchBaskets().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [baskets, error]
}
