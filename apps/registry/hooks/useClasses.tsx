import { useEffect, useState } from 'react'

const queryClasses = 'regen/ecocredit/v1/classes'

// fetch credit classes with pagination from selected network
export const useClasses = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [classes, setClasses] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setClasses(null)
  }, [chainInfo?.rest, limit, offset])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit classes from selected network
    const fetchClasses = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`

      // fetch credit classes with pagination from selected network
      await fetch(chainInfo.rest + '/' + queryClasses + queryParams)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setClasses(res['classes'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchClasses().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [classes, error]
}
