import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryNode = 'chora/geonode/v1/node'

// fetch node and node metadata from selected network and network server
export const useGeonode = (chainInfo: any, nodeId: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [node, setNode] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, or node id change
  useEffect(() => {
    setError(null)
    setNode(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, nodeId])

  // fetch on load and network or node id change
  useEffect(() => {
    // fetch node by node id from selected network
    const fetchNode = async () => {
      await fetch(chainInfo.rest + '/' + queryNode + '/' + nodeId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setNode(res)
          }
        })
    }

    // only fetch if network and node id
    if (chainInfo?.rest && nodeId) {
      fetchNode().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, nodeId])

  // fetch on load and server or node metadata change
  useEffect(() => {
    // fetch node metadata by iri from network server
    const fetchMetadata = async () => {
      await fetch(serverUrl + '/data/' + node.metadata)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res['jsonld'])
            if (
              data['@context'] !==
              'https://schema.chora.io/contexts/geonode.jsonld'
            ) {
              setError('unsupported metadata schema')
            } else {
              setMetadata(data)
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }

    // only fetch if server and node metadata
    if (serverUrl && node?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, node?.metadata])

  return [node, metadata, error]
}
