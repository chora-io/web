import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/chains"

import * as styles from "./ProposalVotes.module.css"

const queryProposal = "cosmos/group/v1/proposal"
const queryVotes = "cosmos/group/v1/votes_by_proposal"

const ProposalVotes = ({ proposalId }) => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [proposal, setProposal] = useState<any>(null)
  const [votes, setVotes] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setVotes(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch proposal and votes if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchProposalAndVotes().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch proposal and votes asynchronously
  const fetchProposalAndVotes = async () => {

    // fetch proposal from selected network
    await fetch(chainInfo.rest + "/" + queryProposal + "/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setProposal(res["proposal"])
        }
      })

    // fetch votes from selected network
    await fetch(chainInfo.rest + "/" + queryVotes + "/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setVotes(res["votes"])
        }
      })
  }

  // whether votes have been finalized
  const votesFinalized = (
    proposal &&
    (
      proposal["status"] === "PROPOSAL_STATUS_ACCEPTED" ||
      proposal["status"] === "PROPOSAL_STATUS_REJECTED"
    )
  )

  return (
    <div className={styles.box}>
      {!votes && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {votes && votes.map(vote => (
        <div className={styles.boxItem} key={vote["voter"]}>
          <div className={styles.boxText}>
            <h3>
              {"voter"}
            </h3>
            <p>
              {vote["voter"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"option"}
            </h3>
            <p>
              {vote["option"]}
            </p>
          </div>
          <Link to={`/proposals/?id=${proposalId}&voter=${vote["voter"]}`}>
            {"view vote"}
          </Link>
        </div>
      ))}
      {votes && votes.length === 0 && !error && (
        <div>
          {votesFinalized ? "votes have been finalized and removed from state" : "no votes found"}
        </div>
      )}
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default ProposalVotes
