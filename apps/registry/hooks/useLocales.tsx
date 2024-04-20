import { useEffect, useState } from 'react'

// TODO(mods): refactor geonode to use "locales"
const queryLocales = 'chora/geonode/v1/nodes'

// fetch locales from selected network
export const useLocales = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [locales, setLocales] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setLocales(null)
  }, [chainInfo?.chainId])

  // fetch on load and param change
  useEffect(() => {
    // fetch locales from selected network
    const fetchLocales = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`
      await fetch(chainInfo.rest + '/' + queryLocales + queryParams)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            // TODO(mods): refactor geonode to use "locales"
            setLocales(res['nodes'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchLocales().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [locales, error]
}
