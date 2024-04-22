import { useEffect, useState } from 'react'

// TODO(regen-ledger): query all data resolvers with pagination
// TODO(regen-ledger): query data resolvers by manager with pagination
const queryResolver = 'regen/data/v1/resolver'

// fetch data resolvers managed by group from selected network
export const useGroupResolvers = (chainInfo: any, policies: any[]) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [resolvers, setResolvers] = useState<any[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setResolvers(null)
  }, [chainInfo?.rest, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // TODO(regen-ledger): query all data resolvers with pagination
    // TODO(regen-ledger): query data resolvers by manager with pagination

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
            nextId = 0
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
