import { useEffect, useState } from 'react'

const queryClasses = 'regen/ecocredit/v1/classes-by-admin'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch credit classes administered by group from selected network
export const useGroupClasses = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [classes, setClasses] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setClasses(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and classes from selected network
    const fetchPoliciesAndClasses = async () => {
      let addrs: string[] = []

      // fetch policies by group id from selected network
      await fetch(chainInfo.rest + '/' + queryPolicies + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            res['group_policies'].map((policy: any) => {
              addrs.push(policy['address'])
            })
          }
        })

      const cs: any[] = []

      // create promise for all async fetch calls
      const promise = addrs.map(async (addr) => {
        // fetch classes by admin address from selected network
        await fetch(chainInfo.rest + '/' + queryClasses + '/' + addr)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res['classes'].map((n: any) => cs.push({ admin: addr, ...n }))
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setClasses(cs)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndClasses().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [classes, error]
}
