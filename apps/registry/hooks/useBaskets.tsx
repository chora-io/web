import { useEffect, useState } from 'react'

const queryBaskets = 'regen/ecocredit/basket/v1/baskets'

// fetch credit baskets from selected network
export const useBaskets = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [baskets, setBaskets] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBaskets(null)
  }, [chainInfo?.chainId])

  // fetch on load and param change
  useEffect(() => {
    // fetch baskets from selected network
    const fetchBaskets = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`
      await fetch(chainInfo.rest + '/' + queryBaskets + queryParams)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBaskets(
              // TODO(regen-ledger): redundant basket denom prefix
              res['baskets_info'].map((basket: any) => ({
                denom: basket['basket_denom'],
                ...basket,
              })),
            )
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchBaskets().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [baskets, error]
}
