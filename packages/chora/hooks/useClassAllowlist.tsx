import { useEffect, useState } from 'react'

const queryClassAllowlist = 'regen/ecocredit/v1/class-creator-allowlist'

// fetch class allowlist from selected network
export const useClassAllowlist = (chainInfo: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [allowlist, setAllowlist] = useState<string | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setAllowlist(null)
  }, [chainInfo?.rest])

  // fetch on load and param change
  useEffect(() => {
    // fetch class allowlist from selected network
    const fetchClassAllowlist = async () => {
      // fetch class allowlist from selected network
      await fetch(chainInfo.rest + '/' + queryClassAllowlist)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setAllowlist(res.enabled ? 'enabled' : 'disabled')
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest) {
      fetchClassAllowlist().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest])

  return [allowlist, error]
}
