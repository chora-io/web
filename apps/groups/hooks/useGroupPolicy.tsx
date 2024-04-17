import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryPolicy = 'cosmos/group/v1/group_policy_info'

// fetch group policy by address from selected network
export const useGroupPolicy = (chainInfo: any, address: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [policy, setPolicy] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setPolicy(null)
  }, [chainInfo?.chainId, serverUrl, address])

  // fetch on load and param change
  useEffect(() => {
    // fetch policy from selected network
    const fetchPolicy = async () => {
      await fetch(chainInfo.rest + '/' + queryPolicy + '/' + address)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setPolicy(res.info)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && address) {
      fetchPolicy().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, address])

  return [policy, error]
}
