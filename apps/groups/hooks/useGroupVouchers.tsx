import { useEffect, useState } from 'react'

const queryVouchers = 'chora/voucher/v1/vouchers-by-issuer'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch vouchers issued by group from selected network
export const useGroupVouchers = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [vouchers, setVouchers] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setVouchers(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and vouchers from selected network
    const fetchPoliciesAndVouchers = async () => {
      let addrs: string[] = []

      // fetch policies from selected network
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

      const vs: any[] = []

      // create promise for all async fetch calls
      const promise = addrs.map(async (addr) => {
        // fetch vouchers from selected network
        await fetch(chainInfo.rest + '/' + queryVouchers + '/' + addr)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res['vouchers'].map((v: any) => vs.push({ issuer: addr, ...v }))
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setVouchers(vs)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndVouchers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [vouchers, error]
}
