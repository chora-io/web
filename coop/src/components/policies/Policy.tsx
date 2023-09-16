import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { formatTimestamp } from "chora/utils"
import { useCoopParams } from "../../hooks/coop"

import { Result } from "chora/components"

import * as styles from "./Policy.module.css"

const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query
const queryPolicy = "cosmos/group/v1/group_policy_info"

const Policy = ({ policyAddress }) => {

  const { chainInfo } = useContext(WalletContext)

  const [groupId, serverUrl] = useCoopParams(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [policy, setPolicy] = useState<any>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)
  const [admin, setAdmin] = useState<any>(undefined)

  // reset state on address or network change
  useEffect(() => {
    setError(undefined)
    setPolicy(undefined)
    setMetadata(undefined)
    setAdmin(undefined)
  }, [policyAddress, chainInfo?.chainId]);

  // fetch on load and address or group change
  useEffect(() => {

    // fetch policy from selected network
    if (groupId) {
      fetchPolicy().catch(err => {
        setError(err.message)
      })
    }
  }, [policyAddress, groupId])

  // fetch on load and policy metadata change
  useEffect(() => {

    // fetch policy metadata from data provider
    if (policy?.metadata) {
      fetchPolicyMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [policy?.metadata])

  // fetch on load and policy admin change
  useEffect(() => {

    // fetch policy admin metadata from selected network and data provider
    if (policy?.admin) {
      fetchPolicyAdminMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [policy?.admin]);

  // fetch policy from selected network
  const fetchPolicy = async () => {

    // fetch policy from selected network
    await fetch(chainInfo.rest + "/" + queryPolicy + "/" + policyAddress)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setPolicy(res.info)
        }
      })
  }

  // fetch policy metadata from data provider
  const fetchPolicyMetadata = async () => {

    // TODO: handle multiple metadata formats (i.e. IRI, IPFS, JSON, etc.)

    // handle metadata as json, otherwise chora server iri
    try {

      // parse policy metadata
      const parsedMetadata = JSON.parse(policy.metadata)
      setMetadata(parsedMetadata)

    } catch(e) {

      // do nothing with error

      // fetch policy or member metadata from data provider
      await fetch(serverUrl + "/data/" + policy.metadata)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res["jsonld"])
            if (
              data["@context"] !== "https://schema.chora.io/contexts/group_policy.jsonld" &&
              data["@context"] !== "https://schema.chora.io/contexts/group_member.jsonld"
            ) {
              setError(`unsupported schema: ${data["@context"]}`)
            } else {
              setMetadata(data)
            }
          }
        })
        .catch(err => {
          setError(err.message)
        })
    }
  }

  // fetch policy admin from selected network and data provider
  const fetchPolicyAdminMetadata = async () => {
    let iri: string

    // handle admin as policy, otherwise member
    try {

      // fetch policy from selected network
      await fetch(chainInfo.rest + "/" + queryPolicy + "/" + policy.admin)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            // throw error to trigger catch
            throw Error(res.message)
          } else {
            iri = res["info"]["metadata"]
          }
        })

    } catch (e) {

      // do nothing with error

      // TODO(cosmos-sdk): query member by group id and member address

      // fetch members from selected network
      await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            const found = res["members"].find(m => m["member"]["address"] === policy["admin"])
            if (found) {
              iri = found["member"]["metadata"]
            }
          }
        })
    }

    if (iri) {

      // fetch policy or member metadata from data provider
      await fetch(serverUrl + "/data/" + iri)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res["jsonld"])
            if (
              data["@context"] !== "https://schema.chora.io/contexts/group_policy.jsonld" &&
              data["@context"] !== "https://schema.chora.io/contexts/group_member.jsonld"
            ) {
              setError(`unsupported schema: ${data["@context"]}`)
            } else {
              setAdmin({
                address: policy["admin"],
                name: data["name"]
              })
            }
          }
        })
        .catch(err => {
          setError(err.message)
        })
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>
          {"name"}
        </h3>
        <p>
          {metadata && metadata["name"] ? metadata["name"] : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"description"}
        </h3>
        <p>
          {metadata && metadata["description"] ? metadata["description"] : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"admin"}
        </h3>
        <p>
          {admin ? (
            <>
              {`${admin["name"]} (`}
                <Link to={`/policies/?address=${admin["address"]}`}>
                  {admin["address"]}
                </Link>
              {")"}
            </>
          ) : (
            <>
              {policy && policy["admin"] ? policy["admin"] : "NA"}
            </>
          )}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"address"}
        </h3>
        <p>
          {policy && policy["address"] ? policy["address"] : "NA"}
        </p>
      </div>
      {policy && policy["decision_policy"] && policy["decision_policy"]["@type"] === "/cosmos.group.v1.ThresholdDecisionPolicy" && (
        <div className={styles.boxText}>
          <h3>
            {"threshold"}
          </h3>
          <p>
            {policy["decision_policy"]["threshold"]}
          </p>
        </div>
      )}
      {policy && policy["decision_policy"] && policy["decision_policy"]["@type"] === "/cosmos.group.v1.PercentageDecisionPolicy" && (
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
          {policy && policy["decision_policy"] ? policy["decision_policy"]["windows"]["voting_period"] : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"min execution period"}
        </h3>
        <p>
          {policy && policy["decision_policy"] ? policy["decision_policy"]["windows"]["min_execution_period"] : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"created at"}
        </h3>
        <p>
          {policy && policy["created_at"] ? formatTimestamp(policy["created_at"]) : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"version"}
        </h3>
        <p>
          {policy && policy["version"] ? policy["version"] : "NA"}
        </p>
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Policy
