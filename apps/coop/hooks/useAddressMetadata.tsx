import { useNetworkCoop, useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryMembers = 'cosmos/group/v1/group_members'
const queryPolicy = 'cosmos/group/v1/group_policy_info'

// fetch address metadata (as policy, otherwise member) from network server
export const useAddressMetadata = (chainInfo: any, address: string) => {
  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, group id, or address change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, groupId, address])

  // fetch on load and network, server, group id, or address change
  useEffect(() => {
    // fetch metadata from selected network and network server
    const fetchMetadata = async () => {
      let iri: string | null
      let isPolicyAddress: boolean

      // handle metadata as policy, otherwise member
      try {
        // fetch policy from selected network
        await fetch(chainInfo.rest + '/' + queryPolicy + '/' + address)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              // throw error to trigger catch
              throw Error(res.message)
            } else {
              isPolicyAddress = true
              iri = res['info']['metadata']
            }
          })
      } catch (e) {
        // TODO(cosmos-sdk): query member by group id and member address

        // fetch members from selected network
        await fetch(chainInfo.rest + '/' + queryMembers + '/' + groupId)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              // set both catch error and fetch error
              setError(`${e.message}: ${res.message}`)
            } else {
              const found = res['members'].find(
                (m: any) => m['member']['address'] === address,
              )
              if (found) {
                iri = found['member']['metadata']
              }
            }
          })
      }

      if (iri) {
        // fetch member metadata from network server
        await fetch(serverUrl + '/data/' + iri)
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              setError(res.error)
            } else {
              const data = JSON.parse(res['jsonld'])
              if (
                data['@context'] !==
                  'https://schema.chora.io/contexts/group_policy.jsonld' &&
                data['@context'] !==
                  'https://schema.chora.io/contexts/group_member.jsonld'
              ) {
                setError('unsupported metadata schema')
              } else {
                setError(null)
                setMetadata({
                  isPolicyAddress,
                  address,
                  name: data['name'],
                })
              }
            }
          })
          .catch((err) => {
            setError(err.message)
          })
      }
    }

    // only fetch if network, server, group id, and address
    if ((chainInfo?.rest, serverUrl && groupId && address)) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, serverUrl, groupId, address])

  return [metadata, error]
}
