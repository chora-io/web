import { useNetworkServer } from 'chora/hooks'
import {
  proposalStatusToJSON,
  proposalExecutorResultToJSON,
} from 'cosmos/api/cosmos/group/v1/types'
import { useEffect, useState } from 'react'

const queryProposal = 'cosmos/group/v1/proposal'

// fetch proposal and proposal metadata from selected network and network server
export const useGroupProposal = (chainInfo: any, proposalId: string) => {
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [proposal, setProposal] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // reset state on network, server, or proposal id change
  useEffect(() => {
    setError(null)
    setProposal(null)
    setMetadata(null)
  }, [chainInfo?.chainId, serverUrl, proposalId])

  // fetch on load and network or proposal id change
  useEffect(() => {
    // fetch proposal from selected network
    const fetchProposal = async () => {
      // fetch proposal from selected network
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
              setProposal(res['proposal'])
            }
          }
        })
    }

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
              setError(res.error)
            }
          } else {
            if (!proposal) {
              setError(null)
              setProposal({
                ...res['proposal'],
                status: proposalStatusToJSON(res['proposal']['status']),
                executor_result: proposalExecutorResultToJSON(
                  res['proposal']['executor_result'],
                ),
              })
            }
          }
        })
    }

    // only fetch if network, server, and proposal id
    if (chainInfo?.rest && serverUrl && proposalId) {
      fetchProposal().catch((err) => {
        setError(err.message)
      })
      fetchProposalIdx().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, serverUrl, proposalId])

  // fetch on load and server or proposal metadata change
  useEffect(() => {
    // fetch proposal metadata from network server
    const fetchMetadata = async () => {
      // fetch proposal metadata from network server
      await fetch(serverUrl + '/data/' + proposal.metadata)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res['jsonld'])
            if (
              data['@context'] !==
              'https://schema.chora.io/contexts/group_proposal.jsonld'
            ) {
              setError('unsupported metadata schema')
            } else {
              setMetadata(data)
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }

    // only fetch if server and proposal metadata
    if (serverUrl && proposal?.metadata) {
      fetchMetadata().catch((err) => {
        setError(err.message)
      })
    }
  }, [serverUrl, proposal?.metadata])

  return [proposal, metadata, error]
}
