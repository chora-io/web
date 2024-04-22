import { useEffect, useState } from 'react'

const queryBasket = 'regen/ecocredit/basket/v1/basket'

// fetch credit basket by denom from selected network
export const useBasket = (chainInfo: any, denom: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [basket, setBasket] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBasket(null)
  }, [chainInfo?.rest, denom])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit basket from selected network
    const fetchBasket = async () => {
      // fetch credit basket by denom from selected network
      await fetch(chainInfo.rest + '/' + queryBasket + '/' + denom)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBasket(res['basket_info'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && denom) {
      fetchBasket().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, denom])

  return [basket, error]
}
