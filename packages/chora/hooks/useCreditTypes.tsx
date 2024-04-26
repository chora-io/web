import { useEffect, useState } from 'react'

const queryCreditTypes = 'regen/ecocredit/v1/credit-types'

// fetch credit types from selected network
export const useCreditTypes = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [creditTypes, setCreditTypes] = useState<string[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setCreditTypes(null)
  }, [chainInfo?.rest])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit types from selected network
    const fetchCreditTypes = async () => {
      // fetch credit types from selected network
      await fetch(chainInfo.rest + '/' + queryCreditTypes)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setCreditTypes(res['credit_types'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchCreditTypes().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [creditTypes, error]
}
