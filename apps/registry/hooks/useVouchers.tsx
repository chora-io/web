import { useEffect, useState } from 'react'

const queryVouchers = 'chora/voucher/v1/vouchers'

// fetch vouchers with pagination from selected network
export const useVouchers = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [vouchers, setVouchers] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setVouchers(null)
  }, [chainInfo?.rest, limit, offset])

  // fetch on load and param change
  useEffect(() => {
    // fetch vouchers from selected network
    const fetchVouchers = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`

      // fetch vouchers with pagination from selected network
      await fetch(chainInfo.rest + '/' + queryVouchers + queryParams)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setVouchers(res['vouchers'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchVouchers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [vouchers, error]
}
