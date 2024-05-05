import { useEffect, useState } from 'react'

const queryClassFee = 'regen/ecocredit/v1/class-fee'

// fetch credit types from selected network
export const useClassFee = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [classFee, setClassFee] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setClassFee(null)
  }, [chainInfo?.rest])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit types from selected network
    const fetchClassFee = async () => {
      // fetch credit types from selected network
      await fetch(chainInfo.rest + '/' + queryClassFee)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setClassFee(res.fee)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchClassFee().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [classFee, error]
}
