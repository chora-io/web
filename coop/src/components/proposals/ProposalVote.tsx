import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/chains"
import { formatTimestamp } from "chora/utils"

import * as styles from "./ProposalVote.module.css"

const queryVote = "cosmos/group/v1/vote_by_proposal_voter"
const serverUrl = "https://server.chora.io"

const ProposalVote = ({ proposalId, voterAddress }) => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [vote, setVote] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setVote(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch vote and metadata if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchVoteAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch vote and metadata asynchronously
  const fetchVoteAndMetadata = async () => {

    let iri: string

    // fetch vote from selected network
    await fetch(chainInfo.rest + "/" + queryVote + "/" + proposalId + "/" + voterAddress)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setVote(res["vote"])
          iri = res["vote"]["metadata"]
        }
      })

    // return if iri is empty or was never set
    if (typeof iri === "undefined" || iri === "") {
      setMetadata({ reason: "NA" })
      return
    }

    // fetch vote data from chora server
    await fetch(serverUrl + "/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else if (res.context !== "https://schema.chora.io/contexts/group_vote.jsonld") {
          setError("unsupported metadata schema")
          setMetadata(null)
        } else {
          setError("")
          setMetadata(JSON.parse(res["jsonld"]))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      {!vote && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {vote && metadata && (
        <div>
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
          <div className={styles.boxText}>
            <h3>
              {"reason"}
            </h3>
            <p>
              {metadata["reason"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"submit time"}
            </h3>
            <p>
              {formatTimestamp(vote["submit_time"])}
            </p>
          </div>
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

export default ProposalVote
