import { useEffect, useState } from 'react'

const queryClassCreators = 'regen/ecocredit/v1/allowed-class-creators'

// fetch class creators from selected network
export const useClassCreators = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [creators, setCreators] = useState<string[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setCreators(null)
  }, [chainInfo?.rest])

  // fetch on load and param change
  useEffect(() => {
    // fetch class creators from selected network
    const fetchClassCreators = async () => {
      // fetch class creators from selected network
      await fetch(chainInfo.rest + '/' + queryClassCreators)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setCreators(res['class_creators'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchClassCreators().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [creators, error]
}
