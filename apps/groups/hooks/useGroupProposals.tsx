import { useNetworkServer } from 'chora/hooks'
import {
  proposalExecutorResultToJSON,
  proposalStatusToJSON,
} from 'cosmos/api/cosmos/group/v1/types'
import { useEffect, useState } from 'react'

const queryProposals = 'cosmos/group/v1/proposals_by_group_policy'

// fetch group proposals by policy addresses from selected network or network server
export const useGroupProposals = (
  chainInfo: any,
  groupId: string,
  policies: any[],
) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [proposals, setProposals] = useState<any[] | null>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setProposals(null)
  }, [
    chainInfo?.chainId,
    chainInfo?.rest,
    serverUrl && groupId,
    policies?.length,
  ])

  // fetch on load and param change
  useEffect(() => {
    // fetch proposals and metadata from selected network and network server
    const fetchProposals = async () => {
      let ps: any[] = []

      // create promise for all async fetch calls
      const promise = policies.map(async (policy) => {
        // fetch proposals by policy address from selected network
        await fetch(
          chainInfo.rest + '/' + queryProposals + '/' + policy.address,
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.code) {
              if (!proposals) {
                setError(res.message)
              }
            } else {
              res.proposals.map((p: any) => ps.push(p))
            }
          })
      })

      // fetch idx proposals from network server
      await fetch(
        serverUrl + '/idx/' + chainInfo.chainId + '/group-proposals/' + groupId,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            if (!proposals) {
              setError(res.error)
            }
          } else {
            res.proposals?.map((p: any) =>
              ps.push({
                ...p,
                status: proposalStatusToJSON(p.status),
                executor_result: proposalExecutorResultToJSON(
                  p['executor_result'],
                ),
              }),
            )
          }
        })

      // set state after promise all complete
      await Promise.all(promise).then(() => {
        // filter out duplicates (if both on chain and indexed)
        // ps = [...new Map(ps.map((p: any) => [p["id"], p])).values()] // TODO: iterable iterator

        // sort ascending by default
        ps.sort((a, b) => b.id - a.id)

        setProposals(ps)
      })
    }

    // only fetch if params available
    if (
      chainInfo?.chainId &&
      chainInfo?.rest &&
      serverUrl &&
      groupId &&
      policies?.length
    ) {
      fetchProposals().catch((err) => {
        setError(err.message)
      })
    }
  }, [
    chainInfo?.chainId,
    chainInfo?.rest,
    serverUrl,
    groupId,
    policies?.length,
  ])

  return [proposals, error]
}
