import { useEffect, useState } from 'react'

// fetch metadata for each group policy from network server
export const useGroupPoliciesWithMetadata = (
  serverUrl: any,
  policies: any[],
) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [withMetadata, setWithMetadata] = useState<any[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setWithMetadata(null)
  }, [serverUrl, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // fetch metadata from network server
    const fetchMetadata = async () => {
      let ps: any[] = []

      // create promise for all async fetch calls
      const promise = policies.map(async (p, i) => {
        // check if parsable, otherwise fetch
        try {
          let parsed = JSON.parse(p['metadata'])
          ps[i] = {
            ...p,
            ...parsed,
          }
        } catch (e) {
          // do nothing with error

          if (p['metadata']) {
            // fetch metadata for group policy from network server
            await fetch(serverUrl + '/data/' + p['metadata'])
              .then((res) => res.json())
              .then((res) => {
                if (res.error) {
                  setError(res.error)
                } else {
                  const data = JSON.parse(res.jsonld)
                  ps[i] = {
                    ...ps[i],
                    ...data,
                  }
                }
              })
              .catch((err) => {
                setError(err.message)
              })
          }
        }
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        // unable to sort if error
        if (!error) {
          // sort policies by name
          ps = ps.sort((a, b) => {
            const nameA = a.name.toUpperCase()
            const nameB = b.name.toUpperCase()
            if (nameA < nameB) return -1
            if (nameA > nameB) return 1
            return 0
          })
        }

        setWithMetadata(ps)
      })
    }

    // only fetch if params available
    if (serverUrl && policies?.length) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, policies?.length])

  return [withMetadata, error]
}
