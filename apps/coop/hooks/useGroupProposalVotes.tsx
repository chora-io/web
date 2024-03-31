import { useNetworkServer } from 'chora/hooks'
import { voteOptionToJSON } from 'cosmos/api/cosmos/group/v1/types'
import { useEffect, useState } from 'react'

const queryVotes = 'cosmos/group/v1/votes_by_proposal'

// fetch votes by proposal id from selected network or indexer service
export const useGroupProposalVotes = (chainInfo: any, proposalId: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [votes, setVotes] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setVotes(null)
  }, [chainInfo?.chainId, proposalId])

  // fetch on load and param change
  useEffect(() => {
    // fetch votes and voters from selected network and network server
    const fetchVotes = async () => {
      let vs: any[] = []

      // fetch votes from selected network
      await fetch(chainInfo.rest + '/' + queryVotes + '/' + proposalId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            if (!votes) {
              setError(res.message)
            }
          } else {
            setError(null)
            res['votes'].map((v: any) => vs.push(v))
          }
        })

      // fetch idx votes from network server
      await fetch(
        serverUrl + '/idx/' + chainInfo.chainId + '/group-votes/' + proposalId,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            if (!votes) {
              setError(res.error)
            }
          } else {
            setError(null)
            res['votes']?.map((v: any) =>
              vs.push({
                ...v,
                option: voteOptionToJSON(v['option']),
              }),
            )
          }
        })

      // filter out duplicates (if both on chain and indexed)
      // vs = [...new Map(vs.map((v: any) => [v["voter"], v])).values()] // TODO: iterable iterator

      setVotes(vs)
    }

    // only fetch if params available
    if (chainInfo?.rest && serverUrl && proposalId) {
      fetchVotes().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, serverUrl, proposalId])

  return [votes, error]
}
