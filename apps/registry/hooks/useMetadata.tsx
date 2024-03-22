import { useEffect, useState } from 'react'

// fetch metadata using provided resolvers
export const useMetadata = (resolvers: any[], iri: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, resolvers, or iri change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [resolvers, iri])

  // fetch on load and resolvers or iri change
  useEffect(() => {
    // fetch metadata by iri using resolvers
    const fetchMetadata = async () => {
      // TODO: retry with multiple resolvers
      const resolverUrl = resolvers[0].url

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
