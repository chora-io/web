import { useEffect, useState } from 'react'

const queryVouchers = 'chora/voucher/v1/vouchers-by-issuer'

// fetch vouchers issued by group from selected network
export const useGroupVouchers = (chainInfo: any, policies: any[]) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [vouchers, setVouchers] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setVouchers(null)
  }, [chainInfo?.rest, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // fetch vouchers from selected network
    const fetchVouchers = async () => {
      const vs: any[] = []

      // create promise for all async fetch calls
      const promise = policies.map(async (policy) => {
        // fetch vouchers by issuer address from selected network
        await fetch(chainInfo.rest + '/' + queryVouchers + '/' + policy.address)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res['vouchers'].map((v: any) =>
                vs.push({ issuer: policy.address, ...v }),
              )
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setVouchers(vs)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchVouchers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [vouchers, error]
}
