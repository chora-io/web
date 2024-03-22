import { useEffect, useState } from 'react'

// fetch metadata using resolvers
export const useResolverMetadata = (
  chainInfo: any,
  resolvers: string,
  iri: string,
) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, resolvers, or iri change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [chainInfo?.chainId, resolvers, iri])

  // fetch on load and resolvers or iri change
  useEffect(() => {
    // fetch metadata by iri using resolvers
    const fetchMetadata = async () => {

      // TODO: try with multiple data resolvers
      const resolverUrl = resolvers[0]

      await fetch(resolverUrl + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            setMetadata(res['jsonld'])
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }

    // only fetch if resolvers and iri
    if (resolvers && iri) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [resolvers, iri])

  return [metadata, error]
}
