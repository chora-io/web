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
  }, [chainInfo?.chainId, denom])

  // fetch on load and param change
  useEffect(() => {
    // fetch basket from selected network
    const fetchBasket = async () => {
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
