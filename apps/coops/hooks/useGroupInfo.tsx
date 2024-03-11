import { useNetworkCoop, useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryGroupInfo = 'cosmos/group/v1/group_info'

// fetch group and group metadata from selected network and network server
export const useGroupInfo = (chainInfo: any) => {
  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [group, setGroup] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, group, or server change
  useEffect(() => {
    setError(null)
    setGroup(null)
    setMetadata(null)
  }, [chainInfo?.chainId, groupId, serverUrl])

  // fetch on load and network or group change
  useEffect(() => {
    // fetch group from selected network
    const fetchGroup = async () => {
      await fetch(chainInfo.rest + '/' + queryGroupInfo + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setGroup(res.info)
          }
        })
    }

    // only fetch if network and group id
    if (chainInfo?.rest && groupId) {
      fetchGroup().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

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

  return [group, metadata, error]
}
