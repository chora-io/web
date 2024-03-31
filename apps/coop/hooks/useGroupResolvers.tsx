import { useEffect, useState } from 'react'

const queryPolicies = 'cosmos/group/v1/group_policies_by_group'
const queryResolver = 'regen/data/v1/resolver'

// fetch data resolvers managed by group from selected network
export const useGroupResolvers = (chainInfo: any, groupId: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [policies, setPolicies] = useState<any[] | null>([])
  const [resolvers, setResolvers] = useState<any[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setResolvers(null)
  }, [chainInfo?.chainId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and resolvers from selected network
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
              setResolvers([])
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

    // TODO(regen-ledger): query all data resolvers with pagination..?
    // TODO(regen-ledger): query data resolvers by manager with pagination..?

    // fetch resolvers by incrementing id until not found
    const fetchResolvers = async () => {
      let nextId = 1
      let resolvers: any[] = []
      while (nextId !== 0) {
        await fetch(chainInfo.rest + '/' + queryResolver + '/' + nextId)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              nextId = 0
            } else {
              if (policies) {
                policies.map((policy: any) => {
                  if (policy['address'] === res['resolver']['manager']) {
                    resolvers.push(res['resolver'])
                  }
                })
              }
              nextId++
            }
          })
          .catch((err) => {
            setError(err.message)
          })
      }
      setResolvers(resolvers)
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchResolvers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [resolvers, error]
}
