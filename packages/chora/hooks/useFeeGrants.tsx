import { useEffect, useState } from 'react'

const queryAllowancesByGrantee = 'cosmos/feegrant/v1beta1/allowances'
const queryAllowancesByGranter = 'cosmos/feegrant/v1beta1/issued'

// fetch feegrant allowances by address from selected network
export const useFeeGrants = (chainInfo: any, address: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [feeGrantee, setFeeGrantee] = useState<any[] | null>(null)
  const [feeGranter, setFeeGranter] = useState<any[] | null>(null)

  // reset state on params change
  useEffect(() => {
    setError(null)
    setFeeGrantee(null)
    setFeeGranter(null)
  }, [chainInfo?.rest, address])

  // fetch on load and params change
  useEffect(() => {
    // fetch feegrant allowances by grantee from selected network
    const fetchAllowancesByGrantee = async () => {
      // fetch feegrant allowances by grantee from selected network
      await fetch(
        chainInfo.rest + '/' + queryAllowancesByGrantee + '/' + address,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setFeeGrantee(res['allowances'])
          }
        })
    }

    // fetch feegrant allowances by granter from selected network
    const fetchAllowancesByGranter = async () => {
      // fetch feegrant allowances by granter from selected network
      await fetch(
        chainInfo.rest + '/' + queryAllowancesByGranter + '/' + address,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setFeeGranter(res['allowances'])
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

  return [feeGrantee, feeGranter, error]
}
