import { useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryVoucher = 'chora/voucher/v1/voucher'

// fetch voucher by id from selected network
export const useVoucher = (chainInfo: any, voucherId: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [voucher, setVoucher] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setVoucher(null)
  }, [chainInfo?.chainId, serverUrl, voucherId])

  // fetch on load and param change
  useEffect(() => {
    // fetch voucher from selected network
    const fetchVoucher = async () => {
      await fetch(chainInfo.rest + '/' + queryVoucher + '/' + voucherId)
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
    if (chainInfo?.rest && voucherId) {
      fetchVoucher().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, voucherId])

  return [voucher, error]
}
