import { useEffect, useState } from 'react'

const queryGroup = 'cosmos/group/v1/group_info'

// fetch groups from selected network
export const useGroups = (chainInfo: any, count: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [groups, setGroups] = useState<any>(null)

  // reset state on network change
  useEffect(() => {
    setError(null)
    setGroups(null)
  }, [chainInfo?.chainId])

  // fetch on load and network change
  useEffect(() => {
    // TODO(cosmos-sdk): query all groups with pagination..?

    // fetch groups by incrementing id until not found
    const fetchGroups = async () => {
      let nextId = 1 + offset
      let groups: any[] = []
      while (nextId !== 0 && groups.length < count) {
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
            setError(err.message)
          })
      }
      setGroups(groups)
    }

    // only fetch if network
    if (chainInfo?.rest) {
      fetchGroups().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, offset])

  return [groups, error]
}
