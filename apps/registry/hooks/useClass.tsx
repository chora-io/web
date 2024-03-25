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
  }, [chainInfo?.chainId, id])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit class by id from selected network
    const fetchClass = async () => {
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

    // only fetch if network and id
    if (chainInfo?.rest && id) {
      fetchClass().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, id])

  return [clazz, error]
}
