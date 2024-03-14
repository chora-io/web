import { useEffect, useState } from 'react'

const queryProjects = 'regen/ecocredit/v1/projects'

// fetch all credit projects from selected network
export const useProjects = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [projects, setProjects] = useState<any>(null)

  // reset state on network or group id change
  useEffect(() => {
    setError(null)
    setProjects(null)
  }, [chainInfo?.chainId])

  // fetch on load and network change
  useEffect(() => {
    // fetch credit projects from selected network
    const fetchProjects = async () => {
      // fetch policies by group id from selected network
      await fetch(chainInfo.rest + '/' + queryProjects)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setProjects(res['projects'])
          }
        })
    }

    // only fetch if network and group id
    if (chainInfo?.rest) {
      fetchProjects().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [projects, error]
}
