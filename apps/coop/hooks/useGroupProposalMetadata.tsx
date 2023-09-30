import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

// fetch group proposal metadata by iri from network server
export const useGroupProposalMetadata = (chainInfo: any, iri: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on server or iri change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [serverUrl, iri])

  // fetch on load and server or iri change
  useEffect(() => {
    // fetch proposal metadata from network server
    const fetchMetadata = async () => {
      // fetch proposal metadata from network server
      await fetch(serverUrl + '/data/' + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res['jsonld'])
            if (
              data['@context'] !==
              'https://schema.chora.io/contexts/group_proposal.jsonld'
            ) {
              setError('unsupported metadata schema')
            } else {
              setError(null)
              setMetadata(data)
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }
    // only fetch if server and iri
    if (serverUrl && iri) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, iri])

  return [metadata, error]
}
