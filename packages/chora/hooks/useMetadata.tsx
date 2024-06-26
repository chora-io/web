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

  // fetch metadata from ipfs network
  const fetchFromIpfs = async (cid: string) => {
    await fetch(serverUrl + '/ipfs/' + cid)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError(res.error)
        } else {
          setMetadata(JSON.parse(res.content))
          setResolverUrl(serverUrl + '/ipfs/')
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  // fetch metadata by iri from network server, otherwise resolve
  const fetchMetadata = async () => {
    let tmpError: any = null
    let metadata: any = null

    // fetch metadata using network server
    await fetch(serverUrl + '/data/' + unresolved)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          // only set error state if both requests fail
          tmpError = res.error
        } else {
          metadata = JSON.parse(res.jsonld)
          setResolverUrl(serverUrl + '/data/')
        }
      })
      .catch((err) => {
        setError(err.message)
      })

    setMetadata(metadata)

    // only resolve if metadata not available on network server
    if (tmpError && !metadata) {
      let resolvers: any[] = []

      // fetch data resolvers by iri
      await fetch(chainInfo.rest + '/' + queryResolvers + '/' + unresolved)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            resolvers = res.resolvers
          }
        })

      // only if no resolvers
      if (resolvers.length === 0) {
        setError(tmpError)
        return // do not continue
      }

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
              let m: any

              // TODO: handle other response formats ?
              if (res.jsonld) {
                m = JSON.parse(res.jsonld)
              } else {
                m = res
              }

              setMetadata(m)
              setResolverUrl(url)
            }
          })
          .catch((err) => {
            setError(err.message)
            setResolverUrl(url)
          })
      }
    }
  }

  // reset state on param change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [chainInfo?.rest, serverUrl, unresolved])

  // fetch on load and param change
  useEffect(() => {
    if (unresolved && serverUrl) {
      // check json string
      try {
        const parsedJson = JSON.parse(unresolved)
        setMetadata(parsedJson)
        return // do not continue
      } catch (e) {
        // continue
      }

      // check ipfs cid
      if (unresolved.substring(0, 2) === 'Qm') {
        fetchFromIpfs(unresolved).catch((err) => {
          setError(err.message)
        })
        return // do not continue
      }

      // check ipfs url
      if (unresolved.includes('ipfs://')) {
        fetchFromIpfs(unresolved.split('//')[1]).catch((err) => {
          setError(err.message)
        })
        return // do not continue
      }
    }

    // only fetch if params available
    if (chainInfo?.rest && serverUrl && unresolved) {
      if (unresolved?.includes('.rdf')) {
        fetchMetadata().catch((err) => {
          setError(err.message)
        })
      }
    }
  }, [chainInfo?.rest, serverUrl, unresolved])

  return [metadata, error, resolverUrl]
}
