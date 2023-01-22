import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import ProposalPreview from "./ProposalPreview"

import * as styles from "./Proposals.module.css"

const groupId = "1" // TODO: configuration file
const queryPolicies = "cosmos/group/v1/group_policies_by_group"
const queryProposals = "cosmos/group/v1/proposals_by_group_policy"

const Proposals = () => {

  const { chainInfo } = useContext(WalletContext)

  const [proposals, setProposals] = useState<any>(null)
  const [error, setError] = useState<string>("")

  const [sort, setSort] = useState<string>("ascending")
  const [filter, setFilter] = useState<string>("none")

  useEffect(() => {
    setProposals(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {


      // call async function
      fetchPoliciesAndProposals().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  useEffect(() => {

    const ps = proposals ? [...proposals] : []

    if (proposals && sort === "ascending") {
      ps.sort((a, b) => b.id - a.id)
    }

    if (proposals && sort === "descending") {
      ps.sort((a, b) => a.id - b.id)
    }

    setProposals(ps)
  }, [sort])

  useEffect(() => {

    if (!proposals) {
      return
    }

    let ps = proposals

    if (filter === "submitted") {
      ps = ps.filter(v => v.status === "PROPOSAL_STATUS_SUBMITTED")
      setProposals([...ps])
    }

    if (filter === "accepted") {
      ps = ps.filter(v => v.status === "PROPOSAL_STATUS_ACCEPTED")
      setProposals([...ps])
    }

    if (filter === "rejected") {
      ps = ps.filter(v => v.status === "PROPOSAL_STATUS_REJECTED")
      setProposals([...ps])
    }

    if (filter === "none") {
      fetchPoliciesAndProposals().catch(err => {
        setError(err.message)
      })
    }
  }, [filter])

  // fetch policies and proposals
  const fetchPoliciesAndProposals = async () => {

    let addresses: string[] = []

    // fetch policies from selected network
    await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          res["group_policies"].map(policy => {
            addresses.push(policy["address"])
          })
        }
      })

    let ps: any[] = []

    // create promise for all async fetch calls
    const promise = addresses.map(async address => {

      // fetch proposals from selected network
      await fetch(chainInfo.rest + "/" + queryProposals + "/" + address)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            res["proposals"].map(p => ps.push(p))
          }
        })
    })

    // set state after promise all complete
    await Promise.all(promise).then(() => {

      // sort ascending by default
      ps.sort((a, b) => b.id - a.id)

      setProposals(ps)
      setSort("ascending")
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.listOptions}>
        {sort === "descending" && (
          <button onClick={() => setSort("ascending")}>
            {"sort by newest"}
          </button>
        )}
        {sort === "ascending" && (
          <button onClick={() => setSort("descending")}>
            {"sort by oldest"}
          </button>
        )}
        {filter === "none" && (
          <button onClick={() => setFilter("submitted")}>
            {"view submitted"}
          </button>
        )}
        {filter === "none" && (
          <button onClick={() => setFilter("accepted")}>
            {"view accepted"}
          </button>
        )}
        {filter === "none" && (
          <button onClick={() => setFilter("rejected")}>
            {"view rejected"}
          </button>
        )}
        {filter !== "none" && (
          <button onClick={() => setFilter("none")}>
            {"clear filter"}
          </button>
        )}
      </div>
      {!proposals && !error && (
        <div className={styles.message}>
          {"loading..."}
        </div>
      )}
      {proposals && proposals.map(proposal => (
        <ProposalPreview
          key={proposal["id"]}
          proposal={proposal}
        />
      ))}
      {proposals && proposals.length === 0 && !error && (
        <div className={styles.message}>
          {"no proposals found"}
        </div>
      )}
      {error && (
        <div className={styles.message}>
          {error}
        </div>
      )}
    </div>
  )
}

export default Proposals
