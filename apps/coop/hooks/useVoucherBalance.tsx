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
  const [balance, setBalance] = useState<any[] | null>(null)

  // reset state on network, voucher id, or address change
  useEffect(() => {
    setError(null)
    setBalance(null)
  }, [chainInfo?.chainId, voucherId, address])

  // fetch on load and network, voucher id, or address change
  useEffect(() => {
    // fetch balance from selected network
    const fetchBalance = async () => {
      let balance: any

      // fetch balance from selected network
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

    // only fetch if network, voucher id, and address
    if (chainInfo?.rest && voucherId && address) {
      fetchBalance().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, voucherId, address])

  return [balance, error]
}
