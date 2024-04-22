import { useEffect, useState } from 'react'

// TODO(mods): refactor geonode to use "subjects"
const querySubjects = 'chora/geonode/v1/nodes'

// fetch subjects with pagination from selected network
export const useSubjects = (chainInfo: any, limit: number, offset: number) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [subjects, setSubjects] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setSubjects(null)
  }, [chainInfo?.rest, limit, offset])

  // fetch on load and param change
  useEffect(() => {
    // fetch subjects from selected network
    const fetchSubjects = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`

      // fetch subjects with pagination from selected network
      await fetch(chainInfo.rest + '/' + querySubjects + queryParams)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            // TODO(mods): refactor geonode to use "subjects"
            setSubjects(res['nodes'])
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchSubjects().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, limit, offset])

  return [subjects, error]
}
