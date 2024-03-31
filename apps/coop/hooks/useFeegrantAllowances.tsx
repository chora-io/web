import { useEffect, useState } from 'react'

const queryAllowancesByGrantee = 'cosmos/feegrant/v1beta1/allowances'
const queryAllowancesByGranter = 'cosmos/feegrant/v1beta1/issued'

// fetch feegrant allowances by address from selected network
export const useFeegrantAllowances = (chainInfo: any, address: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [allowancesGrantee, setAllowancesGrantee] = useState<any[] | null>(null)
  const [allowancesGranter, setAllowancesGranter] = useState<any[] | null>(null)

  // reset state on params change
  useEffect(() => {
    setError(null)
    setAllowancesGrantee(null)
    setAllowancesGranter(null)
  }, [chainInfo?.chainId, address])

  // fetch on load and params change
  useEffect(() => {
    // fetch allowances by grantee from selected network
    const fetchAllowancesByGrantee = async () => {
      await fetch(
        chainInfo.rest + '/' + queryAllowancesByGrantee + '/' + address,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setAllowancesGrantee(res['allowances'])
          }
        })
    }

    // fetch allowances by granter from selected network
    const fetchAllowancesByGranter = async () => {
      await fetch(
        chainInfo.rest + '/' + queryAllowancesByGranter + '/' + address,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setAllowancesGranter(res['allowances'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && address) {
      fetchAllowancesByGrantee().catch((err) => {
        setError(err.message)
      })
      fetchAllowancesByGranter().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, address])

  return [allowancesGrantee, allowancesGranter, error]
}
