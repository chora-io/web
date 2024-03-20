import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

// fetch group metadata from network server
export const useGroupMetadata = (chainInfo: any, group: any) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, group, or server change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [chainInfo?.chainId, group, serverUrl])

  // fetch on load and server or group metadata change
  useEffect(() => {
    // fetch group metadata from network server
    const fetchMetadata = async () => {
      // handle metadata as json, otherwise chora server iri
      try {
        // parse group metadata
        const parsedMetadata = JSON.parse(group.metadata)
        setMetadata(parsedMetadata)
      } catch (e) {
        // do nothing with error

        // fetch group metadata from network server
        await fetch(serverUrl + '/data/' + group.metadata)
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              setError(res.error)
            } else {
              const data = JSON.parse(res['jsonld'])
              if (
                data['@context'] !==
                'https://schema.chora.io/contexts/group.jsonld'
              ) {
                setError(`unsupported metadata schema: ${data['@context']}`)
              } else {
                setMetadata(data)
              }
            }
          })
          .catch((err) => {
            setError(err.message)
          })
      }
    }

    // only fetch if server and group metadata
    if (serverUrl && group?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, group?.metadata])

  return [metadata, error]
}
