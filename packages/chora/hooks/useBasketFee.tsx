import { useEffect, useState } from 'react'

const queryBasketFee = 'regen/ecocredit/basket/v1/basket-fee'

// fetch credit types from selected network
export const useBasketFee = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [basketFee, setBasketFee] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBasketFee(null)
  }, [chainInfo?.rest])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit types from selected network
    const fetchBasketFee = async () => {
      // fetch credit types from selected network
      await fetch(chainInfo.rest + '/' + queryBasketFee)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBasketFee(res['fee'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchBasketFee().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [basketFee, error]
}
