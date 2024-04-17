import { useNetworkServer } from 'chora/hooks'
import { voteOptionToJSON } from 'cosmos/api/cosmos/group/v1/types'
import { useEffect, useState } from 'react'

const queryVote = 'cosmos/group/v1/vote_by_proposal_voter'

// fetch vote by proposal id and address from selected network or indexer service
export const useGroupProposalVote = (
  chainInfo: any,
  proposalId: string,
  address: string,
) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [vote, setVote] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setVote(null)
  }, [chainInfo?.chainId, serverUrl, proposalId, address])

  // fetch on load and param change
  useEffect(() => {
    // fetch vote from selected network
    const fetchVote = async () => {
      await fetch(
        chainInfo.rest + '/' + queryVote + '/' + proposalId + '/' + address,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            if (!vote) {
              setError(res.message)
            }
          } else {
            if (!vote) {
              setError(null)
              setVote(vote)
            }
          }
        })
    }

    // fetch indexed vote from network server
    const fetchVoteIdx = async () => {
      await fetch(
        serverUrl +
          '/idx/' +
          chainInfo.chainId +
          '/group-vote/' +
          proposalId +
          '/' +
          address,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            if (!vote) {
              setError(res.error)
            }
          } else {
            if (!vote) {
              setError(null)
              setVote({
                ...res['vote'],
                option: voteOptionToJSON(res['vote']['option']),
              })
            }
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && serverUrl && proposalId && address) {
      fetchVote().catch((err) => {
        setError(err.message)
      })
      fetchVoteIdx().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, serverUrl, proposalId, address])

  return [vote, error]
}
