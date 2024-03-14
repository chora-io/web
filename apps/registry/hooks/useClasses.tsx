import { useEffect, useState } from 'react'

const queryClasses = 'regen/ecocredit/v1/classes'

// fetch all credit classes from selected network
export const useClasses = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [classes, setClasses] = useState<any>(null)

  // reset state on network or group id change
  useEffect(() => {
    setError(null)
    setClasses(null)
  }, [chainInfo?.chainId])

  // fetch on load and network change
  useEffect(() => {
    // fetch credit classes from selected network
    const fetchClasses = async () => {
      // fetch policies by group id from selected network
      await fetch(chainInfo.rest + '/' + queryClasses)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setClasses(res['classes'])
          }
        })
    }

    // only fetch if network and group id
    if (chainInfo?.rest) {
      fetchClasses().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [classes, error]
}
