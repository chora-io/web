import { useNetworkCoop } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryMembers = 'cosmos/group/v1/group_members'

// fetch group members from selected network
export const useGroupMembers = (chainInfo: any) => {
  const [groupId] = useNetworkCoop(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [members, setMembers] = useState<any>(null)

  // reset state on network or group id change
  useEffect(() => {
    setError(null)
    setMembers(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and network or group id change
  useEffect(() => {
    // fetch members from selected network
    const fetchMembers = async () => {
      await fetch(chainInfo.rest + '/' + queryMembers + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            const ms = res['members']

            // sort ascending by default
            ms.sort(
              (a: any, b: any) =>
                new Date(b['member']['added_at']).getUTCDate() -
                new Date(a['member']['added_at']).getUTCDate(),
            )

            setMembers(ms)
          }
        })
    }

    // only fetch if network and group id
    if (chainInfo?.rest && groupId) {
      fetchMembers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [members, error]
}
