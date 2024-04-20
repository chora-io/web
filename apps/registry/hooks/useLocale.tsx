import { useEffect, useState } from 'react'

// TODO(mods): refactor geonode to use "locales"
const queryLocale = 'chora/geonode/v1/node'

// fetch locale by id from selected network
export const useLocale = (chainInfo: any, localeId: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [locale, setNode] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setNode(null)
  }, [chainInfo?.chainId, localeId])

  // fetch on load and param change
  useEffect(() => {
    // fetch locale by id from selected network
    const fetchNode = async () => {
      await fetch(chainInfo.rest + '/' + queryLocale + '/' + localeId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setNode(res)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && localeId) {
      fetchNode().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, localeId])

  return [locale, error]
}
