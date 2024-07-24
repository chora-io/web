import { useEffect, useState } from 'react'

const queryProposals = 'cosmos/gov/v1/proposals'

// fetch proposal votes by proposal id from selected network
export const useProposalVotes = (
  chainInfo: any,
  proposalId: string,
  limit: number,
  offset: number,
) => {
  // fetch error and results
  const [error, setError] = useState<string | null>(null)
  const [votes, setVotes] = useState<any>(null)

  // reset state on param change
  useEffect(() => {
    setError(null)
    setVotes(null)
  }, [chainInfo?.rest, proposalId, limit, offset])

  // fetch on load and param change
  useEffect(() => {
    // fetch proposal votes from selected network
    const fetchProposalVotes = async () => {
      const queryParams = `?pagination.limit=${limit}&pagination.offset=${offset}`

      // fetch proposal votes by proposal id from selected network
      await fetch(
        chainInfo.rest +
          '/' +
          queryProposals +
          '/' +
          proposalId +
          '/votes' +
          queryParams,
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            setVotes(res.votes)
          }
        })
    }

    // only fetch if params available
    if (chainInfo?.rest && proposalId) {
      fetchProposalVotes().catch((err) => {
        setError(err.message)
      })
    }
  }, [chainInfo?.rest, proposalId, limit, offset])

  return [votes, error]
}
