import { useEffect, useState } from 'react'

const queryProjects = 'regen/ecocredit/v1/projects'

// fetch class projects with pagination from selected network
export const useProjects = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setProjects(null)
  }, [chainInfo?.rest, limit, offset])

  // fetch on load and param change
  useEffect(() => {
    // fetch class projects from selected network
    const fetchProjects = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`

      // fetch class projects with pagination from selected network
      await fetch(chainInfo.rest + '/' + queryProjects + queryParams)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setProjects(res.projects)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchProjects().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [projects, error]
}
