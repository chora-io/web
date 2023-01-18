import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import GroupProposalPreview from "./GroupProposalPreview"

import * as styles from "./GroupProposals.module.css"

const groupId = "1" // TODO: configuration file
const queryPolicies = "cosmos/group/v1/group_policies_by_group"
const queryProposals = "cosmos/group/v1/proposals_by_group_policy"

const GroupProposals = () => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [proposals, setProposals] = useState<any>(null)

  useEffect(() => {
    setProposals(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
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

        const ps = proposals || []

        // create promise for all async fetch calls
        const promise = addresses && addresses.map(async address => {

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
          setProposals(ps)
        })
      }

      // call async function
      fetchPoliciesAndProposals().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!proposals && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {proposals && proposals.map(proposal => (
        <GroupProposalPreview
          key={proposal["id"]}
          proposal={proposal}
        />
      ))}
      {proposals && proposals.length === 0 && !error && (
        <div>
          {"no proposals found"}
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

export default GroupProposals
