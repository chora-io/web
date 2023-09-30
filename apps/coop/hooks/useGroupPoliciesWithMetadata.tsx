import { useNetworkCoop, useNetworkServer } from 'chora/hooks'
import { useEffect, useState } from 'react'

const queryPolicies = 'cosmos/group/v1/group_policies_by_group'

// fetch group policies with metadata from selected network
export const useGroupPoliciesWithMetadata = (chainInfo: any) => {
  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [policies, setPolicies] = useState<any[] | null>(null)

  // reset state on network, server, or group id change
  useEffect(() => {
    setError(null)
    setPolicies(null)
  }, [chainInfo?.chainId, serverUrl, groupId])

  // fetch on load and network, server, or group id change
  useEffect(() => {
    // fetch policies with metadata from selected network and network server
    const fetchPoliciesWithMetadata = async () => {
      let ps: any[] = []

      // fetch policies from selected network
      await fetch(chainInfo.rest + '/' + queryPolicies + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            res['group_policies'].map((p: any) => {
              ps.push(p)
            })
          }
        })

      // create promise for all async fetch calls
      const promise = ps.map(async (p, i) => {
        // fetch policy metadata from network server
        await fetch(serverUrl + '/data/' + p['metadata'])
          .then((res) => res.json())
          .then((res) => {
            if (res.error) {
              setError(res.error)
            } else {
              const data = JSON.parse(res['jsonld'])
              if (
                data['@context'] !==
                'https://schema.chora.io/contexts/group_policy.jsonld'
              ) {
                setError('unsupported metadata schema')
              } else {
                setError(null)
                ps[i] = {
                  ...ps[i],
                  ...data,
                }
              }
            }
          })
          .catch((err) => {
            setError(err.message)
          })
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

        setPolicies(ps)
      })
    }

    // only fetch if network, server, and group id
    if (chainInfo?.rest && serverUrl && groupId) {
      fetchPoliciesWithMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, serverUrl, groupId])

  return [policies, error]
}
