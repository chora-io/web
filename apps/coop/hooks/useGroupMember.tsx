import { useNetworkCoop, useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryMembers = 'cosmos/group/v1/group_members' // TODO(cosmos-sdk): group member query

// fetch member and member metadata from selected network and network server
export const useGroupMember = (chainInfo: any, address: string) => {
  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [member, setMember] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, group, server, or address change
  useEffect(() => {
    setError(null)
    setMember(null)
    setMetadata(null)
  }, [chainInfo?.chainId, groupId, serverUrl, address])

  // fetch on load and network, group, or address change
  useEffect(() => {
    // fetch member from selected network
    const fetchMember = async () => {
      // fetch members from selected network // TODO(cosmos-sdk): group member query
      await fetch(chainInfo.rest + '/' + queryMembers + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            const found = res['members'].find(
              (m: any) => m['member']['address'] === address,
            )
            if (found) {
              setMember(found['member'])
            }
          }
        })
    }

    // only fetch if network, group, and address
    if (chainInfo?.rest && groupId && address) {
      fetchMember().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId, address])

  // fetch on load and server or member metadata change
  useEffect(() => {
    // fetch member metadata from network server
    const fetchMetadata = async () => {
      // handle metadata as json, otherwise chora server iri
      try {
        // parse member metadata
        const parsedMetadata = JSON.parse(member.metadata)
        setMetadata(parsedMetadata)
      } catch (e) {
        // do nothing with error

        // fetch member metadata from network server
        await fetch(serverUrl + '/data/' + member.metadata)
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              setError(res.error)
            } else {
              const data = JSON.parse(res['jsonld'])
              if (
                data['@context'] !==
                'https://schema.chora.io/contexts/group_member.jsonld'
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

    // fetch if server and member metadata
    if (serverUrl && member?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, member?.metadata])

  return [member, metadata, error]
}
