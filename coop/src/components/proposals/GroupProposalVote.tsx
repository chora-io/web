import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./GroupProposalVote.module.css"

const queryVote = "cosmos/group/v1/vote_by_proposal_voter"
const serverUrl = "https://server.chora.io"

const GroupProposalVote = ({ proposalId, voterAddress }) => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [metadata, setMetadata] = useState<any>(null)
  const [vote, setVote] = useState<any>(null)

  useEffect(() => {
    setVote(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch vote if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchVoteAndMetadata = async () => {

        // vote metadata
        let iri: string

        // fetch vote from selected network
        await fetch(chainInfo.rest + "/" + queryVote + "/" + proposalId + "/" + voterAddress)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              setVote(res)
              iri = res["metadata"]
            }
          })

        // return on error (iri never set)
        if (typeof iri === "undefined") {
          return
        }

        // fetch proposal data from chora server
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

      // call async function
      fetchVoteAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!vote && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {vote && metadata && !error && (
        <div className={styles.vote}>
          <div className={styles.item}>
            <h3>
              {"voter"}
            </h3>
            <p>
              {vote["voter"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"option"}
            </h3>
            <p>
              {vote["option"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"reason"}
            </h3>
            <p>
              {metadata["reason"]}
            </p>
          </div>
          <div className={styles.item}>
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

export default GroupProposalVote
