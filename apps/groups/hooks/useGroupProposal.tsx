import { useNetworkServer } from 'chora/hooks'
import {
  proposalStatusToJSON,
  proposalExecutorResultToJSON,
} from 'cosmos/api/cosmos/group/v1/types'
import { useEffect, useState } from 'react'

const queryProposal = 'cosmos/group/v1/proposal'

// fetch group proposal by id from selected network or network server
export const useGroupProposal = (chainInfo: any, proposalId: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [proposal, setProposal] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setProposal(null)
  }, [chainInfo?.chainId, chainInfo?.rest, serverUrl, proposalId])

  // fetch on load and param change
  useEffect(() => {
    // fetch group proposal from selected network
    const fetchProposal = async () => {
      // fetch group proposal by id from selected network
      await fetch(chainInfo.rest + '/' + queryProposal + '/' + proposalId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            if (!proposal) {
              setError(res.message)
            }
          } else {
            if (!proposal) {
              setError(null)
              setProposal(res.proposal)
            }
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && proposalId) {
      fetchProposal().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, proposalId])

  // fetch on load and param change
  useEffect(() => {
    // fetch indexed proposal from network server
    const fetchProposalIdx = async () => {
      // fetch idx proposals from network server
      await fetch(
        serverUrl +
          '/idx/' +
          chainInfo.chainId +
          '/group-proposal/' +
          proposalId,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            if (!proposal) {
              // console log idx error
              console.error(`idx: ${res.error}`)
            }
          } else {
            if (!proposal) {
              setError(null)
              setProposal({
                ...res.proposal,
                status: proposalStatusToJSON(res.proposal.status),
                executor_result: proposalExecutorResultToJSON(
                  res.proposal['executor_result'],
                ),
              })
            }
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.chainId && serverUrl && proposalId) {
      fetchProposalIdx().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.chainId, serverUrl, proposalId])

  return [proposal, error]
}
