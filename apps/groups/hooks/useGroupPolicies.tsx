import { useEffect, useState } from 'react'

const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch group policies by group id from selected network
export const useGroupPolicies = (chainInfo: any, groupId: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [policies, setPolicies] = useState<any[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setPolicies(null)
  }, [chainInfo?.rest, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch group policies from selected network
    const fetchPolicies = async () => {
      // fetch group policies by group id from selected network
      await fetch(chainInfo.rest + '/' + queryPolicies + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            const ps = res['group_policies']

            // sort ascending by default
            ps.sort(
              (a: any, b: any) =>
                new Date(b['created_at']).getUTCDate() -
                new Date(a['created_at']).getUTCDate(),
            )

            setPolicies(ps)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPolicies().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [policies, error]
}
