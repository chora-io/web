import { useEffect, useState } from 'react'

const queryClasses = 'regen/ecocredit/v1/classes-by-admin'

// fetch credit classes administered by group from selected network
export const useGroupClasses = (chainInfo: any, policies: any[]) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [classes, setClasses] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setClasses(null)
  }, [chainInfo?.rest, policies?.length])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit classes from selected network
    const fetchClasses = async () => {
      const cs: any[] = []

      // create promise for all async fetch calls
      const promise = policies.map(async (policy) => {
        // fetch credit classes by admin address from selected network
        await fetch(chainInfo.rest + '/' + queryClasses + '/' + policy.address)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res.classes.map((n: any) =>
                cs.push({ admin: policy.address, ...n }),
              )
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setClasses(cs)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && policies?.length) {
      fetchClasses().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, policies?.length])

  return [classes, error]
}
