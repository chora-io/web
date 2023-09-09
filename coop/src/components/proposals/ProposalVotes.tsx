import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"
import { voteOptionToJSON } from "chora/api/cosmos/group/v1/types"

import * as styles from "./ProposalVotes.module.css"

const groupId = "1"
const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query
const queryVotes = "cosmos/group/v1/votes_by_proposal"

const ProposalVotes = ({ proposalId }) => {

  const { chainInfo, network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [votes, setVotes] = useState<any>(null)
  const [voters, setVoters] = useState<any>(null)

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
    setVotes(null)
    setError("")

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch proposal and votes if network is chora-testnet-1 (or chora-local)
    if (coopChain) {
      fetchProposalAndVotes().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo, network, proposalId])

  // fetch proposal and votes asynchronously
  const fetchProposalAndVotes = async () => {
    let vs: any[] = []

    // fetch idx votes from chora server
    await fetch(serverUrl + "/idx/" + network + "/group-votes/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          if (!votes) {
            setError(res.error)
          }
        } else {
          res["votes"]?.map(v => vs.push({
            ...v,
            option: voteOptionToJSON(v["option"]),
          }))
        }
      })

    // fetch votes from selected network
    await fetch(chainInfo.rest + "/" + queryVotes + "/" + proposalId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          res["votes"].map(v => vs.push(v))
        }
      })

    // filter out duplicates (if both on chain and indexed)
    vs = [...new Map(vs.map(v => [v["voter"], v])).values()]

    setVotes(vs)

    // TODO(cosmos-sdk): query member by group id and member address

    let members = []

    // fetch members from selected network
    await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            for (let i = 0; i < vs.length; i++) {
              const voter = vs[i]["voter"]
              const option = vs[i]["option"]
              const found = res["members"].find(member => member["member"]["address"] === voter)
              if (found) {
                members.push({ option, ...found["member"] })
              }
            }
          }
        })

    let voters = []

    const promise = members.map(async member => {

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
              voters.push({
                address: member["address"],
                name: data["name"],
                option: member["option"],
              })
            }
          }
        })
        .catch(err => {
          setError(err.message)
        })
    })

    // set state after promise all complete
    await Promise.all(promise).then(() => {
      setVoters(voters)
    })
  }

  return (
    <div className={styles.box}>
      {!votes && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {!voters && votes && votes.map(vote => (
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
      {voters && voters.map(voter => (
        <div className={styles.boxItem} key={voter["address"]}>
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
          <div className={styles.boxText}>
            <h3>
              {"option"}
            </h3>
            <p>
              {voter["option"]}
            </p>
          </div>
          <Link to={`/proposals/?id=${proposalId}&voter=${voter["address"]}`}>
            {"view vote"}
          </Link>
        </div>
      ))}
      {votes && votes.length === 0 && !error && (
        <div>
          {"no votes found"}
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
