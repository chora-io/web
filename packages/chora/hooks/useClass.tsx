import { useEffect, useState } from 'react'

const queryClass = 'regen/ecocredit/v1/class'

// fetch credit class by id from selected network
export const useClass = (chainInfo: any, id: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [clazz, setClass] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setClass(null)
  }, [chainInfo?.rest, id])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit class from selected network
    const fetchClass = async () => {
      // fetch credit class by id from selected network
      await fetch(chainInfo.rest + '/' + queryClass + '/' + id)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setClass(res.class)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && id) {
      fetchClass().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, id])

  return [clazz, error]
}
