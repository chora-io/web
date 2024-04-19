import { useEffect, useState } from 'react'

const queryClaims = 'regen/data/v1/attestations-by-attestor'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch data claims attested to by group from selected network
export const useGroupClaims = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [claims, setClaims] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setClaims(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and claims from selected network
    const fetchPoliciesAndClaims = async () => {
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
        // fetch claims by attestor address from selected network
        await fetch(chainInfo.rest + '/' + queryClaims + '/' + addr)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res['attestations'].map((n: any) =>
                cs.push({ attestor: addr, ...n }),
              )
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setClaims(cs)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndClaims().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [claims, error]
}
