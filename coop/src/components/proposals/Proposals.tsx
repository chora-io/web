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

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [proposals, setProposals] = useState<any>(null)

  // list options
  const [sort, setSort] = useState<string>("ascending")
  const [filter, setFilter] = useState<string>("submitted")
  const [filtered, setFiltered] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setProposals(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies and proposals if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchPoliciesAndProposals().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // sort on load and value change
  useEffect(() => {
    const ps = proposals ? [...proposals] : []

    if (proposals && sort === "ascending") {
      ps.sort((a, b) => b.id - a.id)
    }

    if (proposals && sort === "descending") {
      ps.sort((a, b) => a.id - b.id)
    }

    setProposals(ps)

    if (filtered) {
      const fs = [...filtered]

      if (proposals && sort === "ascending") {
        fs.sort((a, b) => b.id - a.id)
      }

      if (proposals && sort === "descending") {
        fs.sort((a, b) => a.id - b.id)
      }

      setFiltered(fs)
    }
  }, [sort])

  // filter on load and value change
  useEffect(() => {
    if (!proposals) {
      return
    }

    let ps = proposals

    if (filter === "submitted") {
      ps = ps.filter(v => v.status === "PROPOSAL_STATUS_SUBMITTED")
      setFiltered([...ps])
    }

    if (filter === "accepted") {
      ps = ps.filter(v => v.status === "PROPOSAL_STATUS_ACCEPTED")
      setFiltered([...ps])
    }

    if (filter === "rejected") {
      ps = ps.filter(v => v.status === "PROPOSAL_STATUS_REJECTED")
      setFiltered([...ps])
    }

    if (filter === "nothing") {
      setFiltered(null)
    }
  }, [filter])

  // fetch policies and proposals asynchronously
  const fetchPoliciesAndProposals = async () => {

    let addrs: string[] = []

    // fetch policies from selected network
    await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          res["group_policies"].map(policy => {
            addrs.push(policy["address"])
          })
        }
      })

    let ps: any[] = []

    // create promise for all async fetch calls
    const promise = addrs.map(async addr => {

      // fetch proposals from selected network
      await fetch(chainInfo.rest + "/" + queryProposals + "/" + addr)
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
      setSort("ascending")

      // filter submitted by default
      const fps = ps.filter(v => v.status === "PROPOSAL_STATUS_SUBMITTED")
      setFilter("submitted")

      setProposals(ps)
      setFiltered(fps)
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <button
          className={filter === "submitted" ? styles.optionActive : null}
          onClick={() => setFilter("submitted")}
        >
          {"submitted"}
        </button>
        <button
          className={filter === "accepted" ? styles.optionActive : null}
          onClick={() => setFilter("accepted")}
        >
          {"accepted"}
        </button>
        <button
          className={filter === "rejected" ? styles.optionActive : null}
          onClick={() => setFilter("rejected")}
        >
          {"rejected"}
        </button>
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
      </div>
      {!proposals && !error && (
        <div className={styles.message}>
          {"loading..."}
        </div>
      )}
      {!filtered && proposals && proposals.map(proposal => (
        <ProposalPreview
          key={proposal["id"]}
          proposal={proposal}
        />
      ))}
      {filtered && filtered.map(proposal => (
        <ProposalPreview
          key={proposal["id"]}
          proposal={proposal}
        />
      ))}
      {!filtered && proposals && proposals.length === 0 && !error && (
        <div className={styles.message}>
          {"no proposals found"}
        </div>
      )}
      {filtered && filtered.length === 0 && !error && (
        <div className={styles.message}>
          {`no proposals with status ${filter}`}
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