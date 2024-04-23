import { useEffect, useState } from 'react'

const queryVoucher = 'chora/voucher/v1/voucher'

// fetch voucher by id from selected network
export const useVoucher = (chainInfo: any, id: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [voucher, setVoucher] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setVoucher(null)
  }, [chainInfo?.rest, id])

  // fetch on load and param change
  useEffect(() => {
    // fetch voucher from selected network
    const fetchVoucher = async () => {
      // fetch voucher by id from selected network
      await fetch(chainInfo.rest + '/' + queryVoucher + '/' + id)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setVoucher(res)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && id) {
      fetchVoucher().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, id])

  return [voucher, error]
}
