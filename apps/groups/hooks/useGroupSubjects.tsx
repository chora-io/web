import { useEffect, useState } from 'react'

// TODO(mods): refactor geonode to use "subjects" and "stewards"
const querySubjects = 'chora/geonode/v1/nodes-by-curator'

// fetch subjects stewarded by group from selected network
export const useGroupSubjects = (chainInfo: any, policies: any[]) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [subjects, setSubjects] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setSubjects(null)
  }, [chainInfo?.rest, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // fetch subjects from selected network
    const fetchSubjects = async () => {
      const ss: any[] = []

      // create promise for all async fetch calls
      const promise = policies.map(async (policy) => {
        // fetch subjects by steward address from selected network
        await fetch(chainInfo.rest + '/' + querySubjects + '/' + policy.address)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              // TODO(mods): refactor geonode to use "subjects" and "stewards"
              res['nodes'].map((l: any) =>
                ss.push({ curator: policy.address, ...l }),
              )
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setSubjects(ss)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchSubjects().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [subjects, error]
}
