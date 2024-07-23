import { useEffect, useState } from 'react'

const queryBalances = 'cosmos/bank/v1beta1/balances'

// fetch bank balances by address from selected network
export const useBankBalances = (chainInfo: any, address: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [balances, setBalances] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBalances(null)
  }, [chainInfo?.rest, address])

  // fetch on load and param change
  useEffect(() => {
    // fetch balances from selected network
    const fetchBalances = async () => {
      // fetch balances by address from selected network
      await fetch(chainInfo.rest + '/' + queryBalances + '/' + address)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setBalances(res.balances)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && address) {
      fetchBalances().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, address])

  return [balances, error]
}
