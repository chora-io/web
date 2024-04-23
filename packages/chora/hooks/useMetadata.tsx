import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryResolvers = 'regen/data/v1/resolvers-by-iri'

// parse metadata or fetch from network server, otherwise resolve
export const useMetadata = (chainInfo: any, unresolved: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<any>(null)
  const [resolverUrl, setResolverUrl] = useState<string | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [chainInfo?.rest, serverUrl, unresolved])

  // fetch on load and param change
  useEffect(() => {
    if (typeof unresolved === 'string') {
      // check json string
      try {
        console.log('unresolved', unresolved)
        const parsedJson = JSON.parse(unresolved)

        console.log('parsedJson', parsedJson)
        setMetadata(parsedJson)
        return // exit effect
      } catch (e) {
        // continue
      }

      // check ipfs url
      if (unresolved.includes('ipfs://')) {
        // TODO: fetch data from ipfs

        console.error('ipfs not supported')

        return // exit effect
      }
    }

    // fetch metadata by iri from network server, otherwise resolve
    const fetchMetadata = async () => {
      let metadata: string = ''

      // fetch metadata using network server
      await fetch(serverUrl + '/data/' + unresolved)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            metadata = JSON.parse(res['jsonld'])
            setResolverUrl(serverUrl + '/data/')
          }
        })
        .catch((err) => {
          setError(err.message)
        })

      setMetadata(metadata)

      // only resolve if metadata not available on network server
      if (!metadata) {
        let resolvers: any[] = []

        // fetch data resolvers by iri
        await fetch(chainInfo.rest + '/' + queryResolvers + '/' + unresolved)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              resolvers = res['resolvers']
            }
          })

        // only if resolvers available
        if (resolvers.length > 0) {
          // TODO: retry with multiple resolvers
          const url = resolvers[0].url

          // fetch metadata using data resolver
          await fetch(url + unresolved)
            .then((res) => res.json())
            .then((res) => {
              if (res.error) {
                setError(res.error)
              } else {
                // TODO: standard/expected response?
                setMetadata(JSON.parse(res['jsonld']))
                setResolverUrl(url)
              }
            })
            .catch((err) => {
              setError(err.message)
            })
        }
      }
    }

    // only fetch if params available
    if (chainInfo?.rest && serverUrl && unresolved) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, serverUrl, unresolved])

  return [metadata, error, resolverUrl]
}
