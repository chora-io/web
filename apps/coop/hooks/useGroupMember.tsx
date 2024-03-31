import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

// TODO(cosmos-sdk): query group member by group id and address
const queryMembers = 'cosmos/group/v1/group_members'

// fetch group member by group id and address from selected network
export const useGroupMember = (
  chainInfo: any,
  groupId: any,
  address: string,
) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [member, setMember] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setMember(null)
  }, [chainInfo?.chainId, groupId, serverUrl, address])

  // fetch on load and param change
  useEffect(() => {
    // fetch member from selected network
    const fetchMember = async () => {
      // TODO(cosmos-sdk): query group member by group id and address
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

    // only fetch if params available
    if (chainInfo?.rest && groupId && address) {
      fetchMember().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId, address])

  return [member, error]
}
