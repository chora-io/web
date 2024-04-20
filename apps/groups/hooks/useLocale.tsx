import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

// TODO(mods): refactor geonode to use "locales"
const queryLocale = 'chora/geonode/v1/node'

// fetch locale by id from selected network
export const useLocale = (chainInfo: any, localeId: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [locale, setLocale] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setLocale(null)
  }, [chainInfo?.chainId, serverUrl, localeId])

  // fetch on load and param change
  useEffect(() => {
    // fetch locale by id from selected network
    const fetchLocale = async () => {
      await fetch(chainInfo.rest + '/' + queryLocale + '/' + localeId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setLocale(res)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && localeId) {
      fetchLocale().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, localeId])

  return [locale, error]
}
