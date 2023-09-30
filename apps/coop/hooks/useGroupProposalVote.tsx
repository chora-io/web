import { useNetworkServer } from 'chora/hooks'
import { voteOptionToJSON } from 'cosmos/api/cosmos/group/v1/types'
import { useEffect, useState } from 'react'

const queryVote = 'cosmos/group/v1/vote_by_proposal_voter'

// fetch proposal vote and vote metadata from selected network and network server
export const useGroupProposalVote = (
  chainInfo: any,
  proposalId: string,
  address: string,
) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [vote, setVote] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, proposal id, or address change
  useEffect(() => {
    setError(null)
    setVote(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, proposalId, address])

  // fetch on load and network, server, proposal id, or address change
  useEffect(() => {
    // fetch vote from selected network
    const fetchVote = async () => {
      // fetch vote from selected network
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
      // fetch idx vote from network server
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

    // only fetch if network, server, proposal id, and address
    if (chainInfo?.rest && serverUrl && proposalId && address) {
      fetchVote().catch((err) => {
        setError(err.message)
      })
      fetchVoteIdx().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, serverUrl, proposalId, address])

  // fetch on load and server or vote metadata change
  useEffect(() => {
    // fetch vote metadata from network server
    const fetchMetadata = async () => {
      // fetch vote metadata from network server
      await fetch(serverUrl + '/data/' + vote.metadata)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res['jsonld'])
            if (
              data['@context'] !==
              'https://schema.chora.io/contexts/group_vote.jsonld'
            ) {
              setError('unsupported metadata schema')
            } else {
              setError(null)
              setMetadata(data)
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }
    // only fetch if server and vote metadata
    if (serverUrl && vote?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, vote?.metadata])

  return [vote, metadata, error]
}
