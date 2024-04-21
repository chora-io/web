import { useEffect, useState } from 'react'

// TODO(mods): refactor geonode to use "subjects" and "stewards"
const querySubjects = 'chora/geonode/v1/nodes-by-curator'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch subjects stewarded by group from selected network
export const useGroupSubjects = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [subjects, setSubjects] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setSubjects(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and subjects from selected network
    const fetchPoliciesAndSubjects = async () => {
      let addrs: string[] = []

      // fetch policies by group id from selected network
      await fetch(chainInfo.rest + '/' + queryPolicies + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            res['group_policies'].map((policy: any) => {
              addrs.push(policy['address'])
            })
          }
        })

      const ls: any[] = []

      // create promise for all async fetch calls
      const promise = addrs.map(async (addr) => {
        // fetch subjects by curator address from selected network
        await fetch(chainInfo.rest + '/' + querySubjects + '/' + addr)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              // TODO(mods): refactor geonode to use "subjects" and "stewards"
              res['nodes'].map((l: any) => ls.push({ curator: addr, ...l }))
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setSubjects(ls)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndSubjects().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [subjects, error]
}
