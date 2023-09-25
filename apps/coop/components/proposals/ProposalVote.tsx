import Link from "next/link"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { voteOptionToJSON } from "chora/api/cosmos/group/v1/types"
import { useNetworkServer } from "chora/hooks"
import { formatTimestamp } from "chora/utils"

import { useNetworkCoop } from "@hooks"

import styles from "./ProposalVote.module.css"

const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query
const queryVote = "cosmos/group/v1/vote_by_proposal_voter"

const ProposalVote = ({ proposalId, voterAddress }: any) => {

  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [vote, setVote] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)
  const [voter, setVoter] = useState<any>(null)

  // fetch on load and proposal, address, and group change
  useEffect(() => {

    // fetch vote from selected network
    if (groupId) {
      fetchVote().catch(err => {
        setError(err.message)
      })
    }
  }, [proposalId, voterAddress, groupId])

  // fetch on load and vote metadata change
  useEffect(() => {

    // fetch vote metadata from selected network
    if (groupId && vote?.metadata) {
      fetchMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [groupId, vote?.metadata])

  // fetch vote from selected network and network server
  const fetchVote = async () => {

    let vote: any
    let iri: string | undefined

    // fetch vote from selected network
    await fetch(chainInfo.rest + "/" + queryVote + "/" + proposalId + "/" + voterAddress)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          if (!vote) {
            setError(res.message)
          }
        } else {
          if (!vote) {
            vote = res["vote"]
            iri = res["vote"]["metadata"]
            setVote(vote)
          }
        }
      })

    // fetch idx vote from network server
    await fetch(serverUrl + "/idx/" + network + "/group-vote/" + proposalId + "/" + voterAddress)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          if (!vote) {
            setError(res.error)
          }
        } else {
          if (!vote) {
            vote = {
              ...res["vote"],
              option: voteOptionToJSON(res["vote"]["option"]),
            }
            iri = res["vote"]["metadata"]
            setVote(vote)
          }
        }
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
          const found = res["members"].find((member: any) => member["member"]["address"] === voter)
          if (found) {
            member = found["member"]
          }
        }
      })

    // fetch member metadata from network server
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

  // fetch vote metadata from network server
  const fetchMetadata = async () => {

    // fetch vote metadata from network server
    await fetch(serverUrl + "/data/" + vote.metadata)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_vote.jsonld") {
            setError("unsupported metadata schema")
          } else {
            setMetadata(data)
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
                <Link href={`/members/?address=${voter["address"]}`}>
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
