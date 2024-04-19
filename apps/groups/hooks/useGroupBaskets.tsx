import { useEffect, useState } from 'react'

const queryBaskets = 'regen/ecocredit/basket/v1/baskets'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch credit baskets curated by group from selected network
export const useGroupBaskets = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [policies, setPolicies] = useState<any[] | null>([])
  const [baskets, setBaskets] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setBaskets(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and baskets from selected network
    const fetchPolicies = async () => {
      // fetch policies by group id from selected network
      await fetch(chainInfo.rest + '/' + queryPolicies + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setPolicies(res['group_policies'])
            if (res['group_policies'].length === 0) {
              setBaskets([])
            }
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPolicies().catch((err) => {
        setError(err.message)
      })
    }

    // TODO(regen-ledger): query baskets by curator with pagination..?

    // fetch baskets from selected network
    const fetchBaskets = async () => {
      let baskets: any[] = []

      await fetch(chainInfo.rest + '/' + queryBaskets)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            if (policies) {
              policies.map((policy: any) => {
                res['baskets_info'].map((basket: any) => {
                  if (policy['address'] === basket['curator']) {
                    baskets.push(basket)
                  }
                })
              })
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })

      setBaskets(baskets)
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchBaskets().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [baskets, error]
}
