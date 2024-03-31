import { useEffect, useState } from 'react'

const queryProject = 'regen/ecocredit/v1/project'

// fetch class project by id from selected network
export const useProject = (chainInfo: any, id: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [project, setProject] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setProject(null)
  }, [chainInfo?.chainId, id])

  // fetch on load and param change
  useEffect(() => {
    // fetch project by id from selected network
    const fetchProject = async () => {
      await fetch(chainInfo.rest + '/' + queryProject + '/' + id)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setProject(res.project)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && id) {
      fetchProject().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, id])

  return [project, error]
}
