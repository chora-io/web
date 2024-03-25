import { useEffect, useState } from 'react'

const queryAnchor = '/regen/data/v1/anchor-by-iri'

// fetch credit anchor by iri from selected network
export const useAnchor = (chainInfo: any, iri: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [anchor, setAnchor] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setAnchor(null)
  }, [chainInfo?.chainId, iri])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit anchor by iri from selected network
    const fetchAnchor = async () => {
      await fetch(chainInfo.rest + '/' + queryAnchor + '/' + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setAnchor(res['anchor'])
          }
        })
    }

    // only fetch if network and iri
    if (chainInfo?.rest && iri) {
      fetchAnchor().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, iri])

  return [anchor, error]
}
