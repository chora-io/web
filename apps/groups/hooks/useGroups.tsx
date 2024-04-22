import { useEffect, useState } from 'react'

// TODO(cosmos-sdk): query all groups with pagination
const queryGroup = 'cosmos/group/v1/group_info'

// fetch groups with pagination from selected network
export const useGroups = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [groups, setGroups] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setGroups(null)
  }, [chainInfo?.chainId])

  // fetch on load and param change
  useEffect(() => {
    // TODO(cosmos-sdk): query all groups with pagination

    // fetch groups by incrementing id until not found
    const fetchGroups = async () => {
      let nextId = 1 + offset
      let groups: any[] = []
      while (nextId !== 0 && groups.length < limit) {
        await fetch(chainInfo.rest + '/' + queryGroup + '/' + nextId)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              nextId = 0
            } else {
              groups.push(res['info'])
              nextId++
            }
          })
          .catch((err) => {
            nextId = 0
            setError(err.message)
          })
      }
      setGroups(groups)
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchGroups().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [groups, error]
}
