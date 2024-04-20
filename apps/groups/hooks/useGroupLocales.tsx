import { useEffect, useState } from 'react'

// TODO(mods): refactor geonode module to use "locales" and "stewards"
const queryLocales = 'chora/geonode/v1/nodes-by-curator'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch locales stewarded by group from selected network
export const useGroupLocales = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [locales, setLocales] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setLocales(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and param change
  useEffect(() => {
    // fetch policies and locales from selected network
    const fetchPoliciesAndLocales = async () => {
      let addrs: string[] = []

      // fetch policies by group id from selected network
      await fetch(chainInfo.rest + '/' + queryPolicies + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            res['group_policies'].map((policy: any) => {
              addrs.push(policy['address'])
            })
          }
        })

      const ls: any[] = []

      // create promise for all async fetch calls
      const promise = addrs.map(async (addr) => {
        // fetch locales by curator address from selected network
        await fetch(chainInfo.rest + '/' + queryLocales + '/' + addr)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              // TODO(mods): refactor geonode module to use "locales" and "stewards"
              res['nodes'].map((l: any) => ls.push({ curator: addr, ...l }))
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setLocales(ls)
      })
    }

    // only fetch if params available
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndLocales().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [locales, error]
}
