import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"
import { formatTimestamp } from "chora/utils"

import * as styles from "./Policy.module.css"

const queryPolicy = "cosmos/group/v1/group_policy_info"

const Policy = ({ policyAddress }) => {

  const { chainInfo, network } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [policy, setPolicy] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

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
    setPolicy(null)
    setError("")

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch policy and metadata if network is chora-testnet-1 (or chora-local)
    if (coopChain) {
      fetchPolicyAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo, network])

  // fetch policy and metadata asynchronously
  const fetchPolicyAndMetadata = async () => {

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
      return
    }

    // fetch policy data from chora server
    await fetch(serverUrl + "/data/" + iri)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
          setMetadata(null)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_policy.jsonld") {
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
  }

  return (
    <div className={styles.box}>
      {!policy && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {policy && metadata && (
        <div>
          <div className={styles.boxText}>
            <h3>
              {"name"}
            </h3>
            <p>
              {metadata["name"] ? metadata["name"] : "NA"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"description"}
            </h3>
            <p>
              {metadata["description"] ? metadata["description"] : "NA"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"admin"}
            </h3>
            <p>
              {policy["admin"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"address"}
            </h3>
            <p>
              {policy["address"]}
            </p>
          </div>
          {policy["decision_policy"]["@type"] === "/cosmos.group.v1.ThresholdDecisionPolicy" && (
            <div className={styles.boxText}>
              <h3>
                {"threshold"}
              </h3>
              <p>
                {policy["decision_policy"]["threshold"]}
              </p>
            </div>
          )}
          {policy["decision_policy"]["@type"] === "/cosmos.group.v1.PercentageDecisionPolicy" && (
            <div className={styles.boxText}>
              <h3>
                {"percentage"}
              </h3>
              <p>
                {policy["decision_policy"]["percentage"]}
              </p>
            </div>
          )}
          <div className={styles.boxText}>
            <h3>
              {"voting period"}
            </h3>
            <p>
              {policy["decision_policy"]["windows"]["voting_period"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"min execution period"}
            </h3>
            <p>
              {policy["decision_policy"]["windows"]["min_execution_period"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"created at"}
            </h3>
            <p>
              {formatTimestamp(policy["created_at"])}
            </p>
          </div>
          <div className={styles.boxText}>
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
