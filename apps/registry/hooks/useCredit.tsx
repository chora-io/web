import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryBatch = 'regen/ecocredit/v1/batch'

// fetch batch and batch metadata from selected network and network server
export const useCredit = (chainInfo: any, denom: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [batch, setBatch] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, or denom change
  useEffect(() => {
    setError(null)
    setBatch(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, denom])

  // fetch on load and network or denom change
  useEffect(() => {
    // fetch batch by denom from selected network
    const fetchBatch = async () => {
      await fetch(chainInfo.rest + '/' + queryBatch + '/' + denom)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBatch(res.batch)
          }
        })
    }

    // only fetch if network and denom
    if (chainInfo?.rest && denom) {
      fetchBatch().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, denom])

  // // fetch on load and server or batch metadata change
  // useEffect(() => {
  //   // fetch batch metadata by iri from network server
  //   const fetchMetadata = async () => {
  //     await fetch(serverUrl + '/data/' + batch.metadata)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res.error) {
  //           setError(res.error)
  //         } else {
  //           const data = JSON.parse(res['jsonld'])
  //           if (
  //             data['@context'] !==
  //             'https://schema.chora.io/contexts/geobatch.jsonld'
  //           ) {
  //             setError('unsupported metadata schema')
  //           } else {
  //             setMetadata(data)
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         setError(err.message)
  //       })
  //   }
  //
  //   // only fetch if server and batch metadata
  //   if (serverUrl && batch?.metadata) {
  //     fetchMetadata().catch((err) => {
  //       setError(err.message)
  //     })
  //   }
  // }, [serverUrl, batch?.metadata])

  return [batch, metadata, error]
}
