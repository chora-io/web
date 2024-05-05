import { useEffect, useState } from 'react'

const queryProjects = 'regen/ecocredit/v1/projects-by-admin'

// fetch class projects administered by group from selected network
export const useGroupProjects = (chainInfo: any, policies: any[]) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setProjects(null)
  }, [chainInfo?.rest, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // fetch class projects from selected network
    const fetchProjects = async () => {
      const ps: any[] = []

      // create promise for all async fetch calls
      const promise = policies.map(async (policy) => {
        // fetch class projects by admin address from selected network
        await fetch(chainInfo.rest + '/' + queryProjects + '/' + policy.address)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res.projects.map((n: any) =>
                ps.push({ admin: policy.address, ...n }),
              )
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setProjects(ps)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchProjects().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [projects, error]
}
