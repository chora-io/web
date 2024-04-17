import { useEffect, useState } from 'react'

const queryProjects = 'regen/ecocredit/v1/projects-by-admin'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch class projects administered by group from selected network
export const useGroupProjects = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setProjects(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and projects from selected network
    const fetchPoliciesAndProjects = async () => {
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

      const cs: any[] = []

      // create promise for all async fetch calls
      const promise = addrs.map(async (addr) => {
        // fetch projects by admin address from selected network
        await fetch(chainInfo.rest + '/' + queryProjects + '/' + addr)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res['projects'].map((n: any) => cs.push({ admin: addr, ...n }))
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setProjects(cs)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndProjects().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [projects, error]
}
