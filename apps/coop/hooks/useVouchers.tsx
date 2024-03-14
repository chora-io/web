import { useEffect, useState } from 'react'

const queryVouchers = 'chora/voucher/v1/vouchers-by-issuer'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch vouchers (curated by coop) from selected network
export const useVouchers = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [vouchers, setVouchers] = useState<any>(null)

  // reset state on network or group id change
  useEffect(() => {
    setError(null)
    setVouchers(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and network or group id change
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

    // only fetch if network and group id
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndVouchers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [vouchers, error]
}
