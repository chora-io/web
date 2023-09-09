import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"
import { formatTimestamp } from "chora/utils"
import { voteOptionToJSON } from "chora/api/cosmos/group/v1/types"

import * as styles from "./ProposalVote.module.css"

const groupId = "1"
const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query
const queryVote = "cosmos/group/v1/vote_by_proposal_voter"

const ProposalVote = ({ proposalId, voterAddress }) => {

  const { chainInfo, network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [vote, setVote] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)
  const [voter, setVoter] = useState<any>(null)

  // whether network is supported by coop app
  const coopChain = (
      network === choraTestnet.chainId ||
      network === choraLocal.chainId
  )

  // whether network is a local network
  const localChain = network?.includes("-local")

  // chora server (use local server if local network)
  let serverUrl = "http://localhost:3000"
  if (!localChain) {
    serverUrl = "https://server.chora.io"
  }

  // fetch on load and value change
  useEffect(() => {
    setVote(null)
    setError("")

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch vote and metadata if network is chora-testnet-1 (or chora-local)
    if (coopChain) {
      fetchVoteAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo, network])

  // fetch vote and metadata asynchronously
  const fetchVoteAndMetadata = async () => {

    let vote: any
    let iri: string

    // fetch idx vote from chora server
    await fetch(serverUrl + "/idx/" + network + "/group-vote/" + proposalId + "/" + voterAddress)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          if (!vote) {
            setError(res.error)
          }
        } else {
          vote = {
            ...res["vote"],
            option: voteOptionToJSON(res["vote"]["option"]),
          }
          iri = res["vote"]["metadata"]
          setVote(vote)
        }
      })

    // fetch vote from selected network
    await fetch(chainInfo.rest + "/" + queryVote + "/" + proposalId + "/" + voterAddress)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          if (!vote) {
            setError(res.message)
          }
        } else {
          vote = res["vote"]
          iri = res["vote"]["metadata"]
          setVote(vote)
        }
      })

    // return if iri is empty or was never set
    if (typeof iri === "undefined" || iri === "") {
      return
    }

    // fetch vote data from chora server
    await fetch(serverUrl + "/data/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_vote.jsonld") {
            setError("unsupported metadata schema")
            setMetadata(null)
          } else {
            setError("")
            setMetadata(data)
          }
        }
      })
      .catch(err => {
        setError(err.message)
      })


    // TODO(cosmos-sdk): query member by group id and member address

    let member: any

    // fetch members from selected network
    await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          const voter = vote["voter"]
          const found = res["members"].find(member => member["member"]["address"] === voter)
          if (found) {
            member = found["member"]
          }
        }
      })

    // fetch member data from chora server
    await fetch(serverUrl + "/data/" + member["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_member.jsonld") {
            setError("unsupported metadata schema")
          } else {
            setError("")
            setVoter({
              address: member["address"],
              name: data["name"],
            })
          }
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
          {!voter && (
            <div className={styles.boxText}>
              <h3>
                {"voter"}
              </h3>
              <p>
                {vote["voter"]}
              </p>
            </div>
          )}
          {voter && (
            <div className={styles.boxText}>
              <h3>
                {"voter"}
              </h3>
              <p key={voter["address"]}>
                {`${voter["name"]} (`}
                <Link to={`/members/?address=${voter["address"]}`}>
                  {voter["address"]}
                </Link>
                {")"}
              </p>
            </div>
          )}
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
              {metadata["reason"] ? metadata["reason"] : "NA"}
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
