import { useEffect, useState } from 'react'

const queryResolversByIRI = '/regen/data/v1/resolvers-by-iri'

// fetch resolvers by iri from selected network
export const useResolvers = (chainInfo: any, iri: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [resolvers, setResolvers] = useState<any[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setResolvers(null)
  }, [chainInfo?.rest, iri])

  // fetch on load and param change
  useEffect(() => {
    // fetch resolvers from selected network
    const fetchResolvers = async () => {
      // fetch resolvers by iri from selected network
      await fetch(chainInfo.rest + '/' + queryResolversByIRI + '/' + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setResolvers(res['resolvers'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && iri) {
      fetchResolvers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, iri])

  return [resolvers, error]
}
