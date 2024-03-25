import { useEffect, useState } from 'react'

const queryAttestations = '/regen/data/v1/attestations-by-iri'

// fetch attestations by iri from selected network
export const useAttestations = (chainInfo: any, iri: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [attestations, setAttestations] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setAttestations(null)
  }, [chainInfo?.chainId, iri])

  // fetch on load and param change
  useEffect(() => {
    // fetch attestations by iri from selected network
    const fetchAttestations = async () => {
      await fetch(chainInfo.rest + '/' + queryAttestations + '/' + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setAttestations(res['attestations'])
          }
        })
    }

    // only fetch if network and iri
    if (chainInfo?.rest && iri) {
      fetchAttestations().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, iri])

  return [attestations, error]
}
