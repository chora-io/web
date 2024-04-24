import { useEffect, useState } from 'react'

const queryResolver = 'regen/data/v1/resolver'

// fetch class resolver by id from selected network
export const useResolver = (chainInfo: any, id: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [resolver, setResolver] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setResolver(null)
  }, [chainInfo?.rest, id])

  // fetch on load and param change
  useEffect(() => {
    // fetch resolver from selected network
    const fetchResolver = async () => {
      // fetch resolver by id from selected network
      await fetch(chainInfo.rest + '/' + queryResolver + '/' + id)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setResolver(res.resolver)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && id) {
      fetchResolver().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, id])

  return [resolver, error]
}
