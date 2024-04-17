import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryGroupInfo = 'cosmos/group/v1/group_info'

// fetch group from selected network
export const useGroupInfo = (chainInfo: any, groupId: any) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [group, setGroup] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setGroup(null)
  }, [chainInfo?.chainId, groupId, serverUrl])

  // fetch on load and param change
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

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchGroup().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [group, error]
}
