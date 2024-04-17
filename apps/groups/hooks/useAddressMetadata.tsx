import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryMembers = 'cosmos/group/v1/group_members'
const queryPolicy = 'cosmos/group/v1/group_policy_info'

// fetch address metadata (as policy, otherwise member) from network server
export const useAddressMetadata = (
  chainInfo: any,
  groupId: any,
  address: string,
) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, groupId, address])

  // fetch on load and param change
  useEffect(() => {
    // fetch metadata from selected network and network server
    const fetchMetadata = async () => {
      let unresolved: string | undefined
      let isPolicyAddress = false

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
              unresolved = res['info']['metadata']
            }
          })
      } catch (e) {
        // TODO(cosmos-sdk): query member by group id and member address

        // fetch members from selected network
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
                unresolved = found['member']['metadata']
              }
            }
          })
      }

      if (typeof unresolved === 'string') {
        // check json string
        try {
          const parsedJson = JSON.parse(unresolved)
          setMetadata({
            isPolicyAddress,
            address,
            name: parsedJson['name'],
          })
          return // exit effect
        } catch (e) {
          // continue
        }

        // check ipfs url
        if (unresolved.includes('ipfs://')) {
          // TODO: fetch data from ipfs

          console.error('ipfs not supported')

          return // exit effect
        }

        // fetch member metadata from network server
        await fetch(serverUrl + '/data/' + unresolved)
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              setError(res.error)
            } else {
              const data = JSON.parse(res['jsonld'])
              setMetadata({
                isPolicyAddress,
                address,
                name: data['name'],
              })
            }
          })
          .catch((err) => {
            setError(err.message)
          })
      }
    }

    // only fetch if params available
    if ((chainInfo?.rest, serverUrl && groupId && address)) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, serverUrl, groupId, address])

  return [metadata, error]
}
