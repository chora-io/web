import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryResolvers = 'regen/data/v1/resolvers-by-iri'

// fetch metadata using network server, otherwise data resolvers
export const useMetadata = (chainInfo: any, iri: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [chainInfo?.chainId, iri])

  // fetch on load and param change
  useEffect(() => {
    // fetch metadata by iri using network server, otherwise data resolvers
    const fetchMetadata = async () => {
      // fetch metadata using network server
      await fetch(serverUrl + '/data/' + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            setMetadata(JSON.parse(res['jsonld']))
          }
        })
        .catch((err) => {
          setError(err.message)
        })

      if (!metadata) {
        let resolvers: any[] = []

        // fetch data resolvers by iri
        await fetch(chainInfo.rest + '/' + queryResolvers + '/' + iri)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              resolvers = res['resolvers']
            }
          })

        // only if resolvers
        if (resolvers && resolvers.length) {
          // TODO: retry with multiple resolvers
          const resolverUrl = resolvers[0].url

          // fetch metadata using data resolver
          await fetch(resolverUrl + iri)
            .then((res) => res.json())
            .then((res) => {
              if (res.error) {
                setError(res.error)
              } else {
                // TODO: standard/expected response?
                setMetadata(JSON.parse(res['jsonld']))
              }
            })
            .catch((err) => {
              setError(err.message)
            })
        }
      }
    }

    // only fetch if network, server, and iri
    if (chainInfo?.rest && serverUrl && iri) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo, serverUrl, iri])

  return [metadata, error]
}
