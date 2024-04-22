import { useEffect, useState } from 'react'

const queryGrantsByGrantee = 'cosmos/authz/v1beta1/grants/grantee'
const queryGrantsByGranter = 'cosmos/authz/v1beta1/grants/granter'

// fetch authz grants by address from selected network
export const useAuthzGrants = (chainInfo: any, address: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [grantsGrantee, setGrantsGrantee] = useState<any[] | null>(null)
  const [grantsGranter, setGrantsGranter] = useState<any[] | null>(null)

  // reset state on params change
  useEffect(() => {
    setError(null)
    setGrantsGrantee(null)
    setGrantsGranter(null)
  }, [chainInfo?.rest, address])

  // fetch on load and params change
  useEffect(() => {
    // fetch authz grants by grantee from selected network
    const fetchGrantsByGrantee = async () => {
      // fetch authz grants by grantee from selected network
      await fetch(chainInfo.rest + '/' + queryGrantsByGrantee + '/' + address)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setGrantsGrantee(res['grants'])
          }
        })
    }

    // fetch authz grants by granter from selected network
    const fetchGrantsByGranter = async () => {
      // fetch authz grants by granter from selected network
      await fetch(chainInfo.rest + '/' + queryGrantsByGranter + '/' + address)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setGrantsGranter(res['grants'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && address) {
      fetchGrantsByGrantee().catch((err) => {
        setError(err.message)
      })
      fetchGrantsByGranter().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, address])

  return [grantsGrantee, grantsGranter, error]
}
