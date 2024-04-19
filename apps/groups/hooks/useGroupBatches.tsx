import { useEffect, useState } from 'react'

const queryBatches = 'regen/ecocredit/v1/batches-by-issuer'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch credit batches issued by group from selected network
export const useGroupBatches = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [batches, setBatches] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBatches(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and batches from selected network
    const fetchPoliciesAndBatches = async () => {
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
        // fetch batches by issuer address from selected network
        await fetch(chainInfo.rest + '/' + queryBatches + '/' + addr)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res['batches'].map((n: any) => cs.push({ issuer: addr, ...n }))
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setBatches(cs)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndBatches().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [batches, error]
}
