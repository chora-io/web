import { useEffect, useState } from 'react'

const queryBalance = 'chora/voucher/v1/balance'

// fetch voucher balance by voucher id and address from selected network
export const useVoucherBalance = (
  chainInfo: any,
  voucherId: string,
  address: string,
) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [balance, setBalance] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBalance(null)
  }, [chainInfo?.chainId, voucherId, address])

  // fetch on load and param change
  useEffect(() => {
    // fetch balance from selected network
    const fetchBalance = async () => {
      let balance: any
      await fetch(
        chainInfo.rest + '/' + queryBalance + '/' + voucherId + '/' + address,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            balance = res
            setBalance(res)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && voucherId && address) {
      fetchBalance().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, voucherId, address])

  return [balance, error]
}
