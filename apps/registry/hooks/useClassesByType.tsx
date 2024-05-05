import { useEffect, useState } from 'react'

// TODO(regen-ledger): query classes by credit type
const queryClasses = 'regen/ecocredit/v1/classes'

// fetch credit classes by credit type from selected network
export const useClassesByType = (chainInfo: any, creditTypeAbbrev: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [classes, setClasses] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setClasses(null)
  }, [chainInfo?.rest])

  // fetch on load and param change
  useEffect(() => {
    // fetch credit classes from selected network
    const fetchClasses = async () => {
      // fetch credit classes by credit type from selected network
      await fetch(chainInfo.rest + '/' + queryClasses)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            // TODO(regen-ledger): query classes by credit type
            const filtered: any[] = []
            res.classes.map((c: any) => {
              if (c['credit_type_abbrev'] === creditTypeAbbrev) {
                filtered.push(c)
              }
            })
            setClasses(filtered)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchClasses().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, creditTypeAbbrev])

  return [classes, error]
}
