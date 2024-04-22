import { useEffect, useState } from 'react'

import { useNetworkServer } from '.'

// TODO(mods): refactor geonode to use "subjects"
const querySubject = 'chora/geonode/v1/node'

// fetch subject by id from selected network
export const useSubject = (chainInfo: any, id: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [subject, setSubject] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setSubject(null)
  }, [chainInfo?.chainId, serverUrl, id])

  // fetch on load and param change
  useEffect(() => {
    // fetch subject by id from selected network
    const fetchSubject = async () => {
      await fetch(chainInfo.rest + '/' + querySubject + '/' + id)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setSubject(res)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && id) {
      fetchSubject().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, id])

  return [subject, error]
}
