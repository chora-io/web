import { useEffect, useState } from 'react'

const queryBalances = 'chora/voucher/v1/balances-by-voucher'

// fetch voucher balances from selected network
export const useVoucherBalances = (chainInfo: any, voucherId: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [balances, setBalances] = useState<any[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBalances(null)
  }, [chainInfo?.chainId, voucherId])

  // fetch on load and param change
  useEffect(() => {
    // fetch balances from selected network
    const fetchBalances = async () => {
      await fetch(chainInfo.rest + '/' + queryBalances + '/' + voucherId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBalances(res['total_amounts'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && voucherId) {
      fetchBalances().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, voucherId])

  return [balances, error]
}
