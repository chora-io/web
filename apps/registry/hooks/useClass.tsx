import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryClass = 'regen/ecocredit/v1/class'

// fetch class and class metadata from selected network and network server
export const useClass = (chainInfo: any, id: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [clazz, setClass] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, or id change
  useEffect(() => {
    setError(null)
    setClass(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, id])

  // fetch on load and network or id change
  useEffect(() => {
    // fetch class by id from selected network
    const fetchClass = async () => {
      await fetch(chainInfo.rest + '/' + queryClass + '/' + id)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setClass(res.class)
          }
        })
    }

    // only fetch if network and id
    if (chainInfo?.rest && id) {
      fetchClass().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, id])

  // // fetch on load and server or class metadata change
  // useEffect(() => {
  //   // fetch class metadata by iri from network server
  //   const fetchMetadata = async () => {
  //     await fetch(serverUrl + '/data/' + clazz.metadata)
  //       .then((res) => res.json())
  //       .then((res) => {
  //         if (res.error) {
  //           setError(res.error)
  //         } else {
  //           const data = JSON.parse(res['jsonld'])
  //           if (
  //             data['@context'] !==
  //             'https://schema.chora.io/contexts/geonode.jsonld'
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
  //   // only fetch if server and class metadata
  //   if (serverUrl && clazz?.metadata) {
  //     fetchMetadata().catch((err) => {
  //       setError(err.message)
  //     })
  //   }
  // }, [serverUrl, clazz?.metadata])

  return [clazz, metadata, error]
}
