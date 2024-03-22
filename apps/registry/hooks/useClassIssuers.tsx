import { useEffect, useState } from 'react'

const queryClassIssuers = 'regen/ecocredit/v1/class-issuers'

// fetch class issuers by class id from selected network
export const useClassIssuers = (chainInfo: any, classId: string) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [issuers, setIssuers] = useState<any>(null)

  // reset state on network or class id change
  useEffect(() => {
    setError(null)
    setIssuers(null)
  }, [chainInfo?.chainId])

  // fetch on load and network change
  useEffect(() => {
    // fetch class issuers from selected network
    const fetchBatches = async () => {
      // fetch issuers by class id from selected network
      await fetch(chainInfo.rest + '/' + queryClassIssuers + '/' + classId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setIssuers(res['issuers'])
          }
        })
    }

    // only fetch if network
    if (chainInfo?.rest) {
      fetchBatches().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, classId])

  return [issuers, error]
}
