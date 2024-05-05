import { useEffect, useState } from 'react'

// TODO(regen-ledger): query all data resolvers with pagination
const queryResolver = '/regen/data/v1/resolver'

// fetch data resolvers from selected network
export const useResolvers = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [resolvers, setResolvers] = useState<any[] | null>(null)

  // reset state on network change
  useEffect(() => {
    setError(null)
    setResolvers(null)
  }, [chainInfo?.rest, limit, offset])

  // fetch on load and network change
  useEffect(() => {
    // TODO(regen-ledger): query all data resolvers with pagination

    // fetch resolvers by incrementing id until not found
    const fetchResolvers = async () => {
      let nextId = 1 + offset
      let resolvers: any[] = []
      while (nextId !== 0 && resolvers.length < limit) {
        await fetch(chainInfo.rest + '/' + queryResolver + '/' + nextId)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              nextId = 0
            } else {
              resolvers.push(res.resolver)
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

    // only fetch if network
    if (chainInfo?.rest) {
      fetchResolvers().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [resolvers, error]
}
