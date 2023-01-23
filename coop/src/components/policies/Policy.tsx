import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./Policy.module.css"

const queryPolicy = "cosmos/group/v1/group_policy_info"
const serverUrl = "https://server.chora.io"

const Policy = ({ policyAddress }) => {

  const { chainInfo } = useContext(WalletContext)

  const [error, setError] = useState<string>("")
  const [policy, setPolicy] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setPolicy(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchPolicyAndMetadata = async () => {

        // policy metadata
        let iri: string

        // fetch policies from selected network
        await fetch(chainInfo.rest + "/" + queryPolicy + "/" + policyAddress)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              setPolicy(res["info"])
              iri = res["info"]["metadata"]
            }
          })

        // return if iri is empty or was never set
        if (typeof iri === "undefined" || iri === "") {
          setMetadata({ name: "NA", description: "NA" })
          return
        }

        // fetch policy data from chora server
        await fetch(serverUrl + "/" + iri)
          .then(res => res.json())
          .then(res => {
            if (res.error) {
              setError(res.error)
              setMetadata(null)
            } else if (res.context !== "https://schema.chora.io/contexts/group_policy.jsonld") {
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
      fetchPolicyAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!policy && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {policy && metadata && !error && (
        <div>
          <div className={styles.item}>
            <h3>
              {"name"}
            </h3>
            <p>
              {metadata["name"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"description"}
            </h3>
            <p>
              {metadata["description"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"admin"}
            </h3>
            <p>
              {policy["admin"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"address"}
            </h3>
            <p>
              {policy["address"]}
            </p>
          </div>
          {policy["decision_policy"]["@type"] === "/cosmos.group.v1.ThresholdDecisionPolicy" && (
            <div className={styles.item}>
              <h3>
                {"threshold"}
              </h3>
              <p>
                {policy["decision_policy"]["threshold"]}
              </p>
            </div>
          )}
          {policy["decision_policy"]["@type"] === "/cosmos.group.v1.PercentageDecisionPolicy" && (
            <div className={styles.item}>
              <h3>
                {"percentage"}
              </h3>
              <p>
                {policy["decision_policy"]["percentage"]}
              </p>
            </div>
          )}
          <div className={styles.item}>
            <h3>
              {"voting period"}
            </h3>
            <p>
              {policy["decision_policy"]["windows"]["voting_period"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"min execution period"}
            </h3>
            <p>
              {policy["decision_policy"]["windows"]["min_execution_period"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"created at"}
            </h3>
            <p>
              {formatTimestamp(policy["created_at"])}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"version"}
            </h3>
            <p>
              {policy["version"]}
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

export default Policy
