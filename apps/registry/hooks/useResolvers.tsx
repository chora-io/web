import { useEffect, useState } from 'react'

const queryResolvers = '/regen/data/v1/resolvers-by-iri'

// fetch resolvers by iri from selected network
export const useResolvers = (chainInfo: any, iri: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [resolvers, setResolvers] = useState<any[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setResolvers(null)
  }, [chainInfo?.chainId, iri])

  // fetch on load and param change
  useEffect(() => {
    // fetch resolvers by iri from selected network
    const fetchResolvers = async () => {
      await fetch(chainInfo.rest + '/' + queryResolvers + '/' + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setResolvers(res['resolvers'])
          }
        })
    }

    // only fetch if network and iri
    if (chainInfo?.rest && iri) {
      fetchResolvers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, iri])

  return [resolvers, error]
}
