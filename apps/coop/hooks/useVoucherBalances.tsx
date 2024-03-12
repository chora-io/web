import { useEffect, useState } from 'react'

const queryBalances = 'chora/voucher/v1/balances-by-voucher'

// fetch voucher balances from selected network
export const useVoucherBalances = (chainInfo: any, voucherId: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [balances, setBalances] = useState<any[] | null>(null)

  // reset state on network or voucher id change
  useEffect(() => {
    setError(null)
    setBalances(null)
  }, [chainInfo?.chainId, voucherId])

  // fetch on load and network or voucher id change
  useEffect(() => {
    // fetch balances from selected network
    const fetchBalances = async () => {
      // fetch balances from selected network
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

    // only fetch if network and voucher id
    if (chainInfo?.rest && voucherId) {
      fetchBalances().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, voucherId])

  return [balances, error]
}
