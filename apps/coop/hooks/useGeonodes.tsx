import { useEffect, useState } from 'react'

const queryGeonodes = 'chora/geonode/v1/nodes-by-curator'
const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch nodes (curated by coop) from selected network
export const useGeonodes = (chainInfo: any, groupId: any) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [nodes, setNodes] = useState<any>(null)

  // reset state on network or group id change
  useEffect(() => {
    setError(null)
    setNodes(null)
  }, [chainInfo?.chainId, groupId])

  // fetch on load and network or group id change
  useEffect(() => {
    // fetch policies and nodes from selected network
    const fetchPoliciesAndNodes = async () => {
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

      const ns: any[] = []

      // create promise for all async fetch calls
      const promise = addrs.map(async (addr) => {
        // fetch nodes by curator address from selected network
        await fetch(chainInfo.rest + '/' + queryGeonodes + '/' + addr)
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              setError(res.message)
            } else {
              res['nodes'].map((n: any) => ns.push({ curator: addr, ...n }))
            }
          })
      })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        setNodes(ns)
      })
    }

    // only fetch if network and group id
    if (chainInfo?.rest && groupId) {
      fetchPoliciesAndNodes().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, groupId])

  return [nodes, error]
}
