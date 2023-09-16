import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { formatTimestamp } from "chora/utils"
import { useCoopParams } from "../hooks/coop"

import * as styles from "./FeegrantAllowance.module.css"

const queryMembers = "cosmos/group/v1/group_members"
const queryPolicy = "cosmos/group/v1/group_policy_info"

const FeegrantAllowance = ({ allowance }) => {

  const { chainInfo } = useContext(WalletContext)

  const [groupId, serverUrl] = useCoopParams(chainInfo)

  const [error, setError] = useState<string | undefined>(undefined)
  const [grantee, setGrantee] = useState<any>(undefined)
  const [granter, setGranter] = useState<any>(undefined)

  // reset state on allowance or network change
  useEffect(() => {
    setError(undefined)
    setGrantee(undefined)
    setGranter(undefined)
  }, [allowance, chainInfo?.chainId]);

  // fetch on load and group or allowance grantee or granter change
  useEffect(() => {
    setError("")
    fetchGrantee().catch(err => {
      setError(err.message)
    })
    fetchGranter().catch(err => {
      setError(err.message)
    })
  }, [groupId, allowance?.grantee, allowance?.granter]);

  // fetch grantee from selected network and data provider
  const fetchGrantee = async () => {

    let iri: string
    let isPolicyAddress: boolean

    // handle grantee as policy, otherwise member
    try {

      // fetch policy from selected network
      await fetch(chainInfo.rest + "/" + queryPolicy + "/" + allowance["grantee"])
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            // throw error to trigger catch
            throw Error(res.message)
          } else {
            isPolicyAddress = true
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
            const found = res["members"].find(m => m["member"]["address"] === allowance["grantee"])
            if (found) {
              iri = found["member"]["metadata"]
            }
          }
        })
    }

    if (iri) {

      // fetch member metadata from data provider
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
              setError("unsupported metadata schema")
            } else {
              setError("")
              setGrantee({
                isPolicyAddress,
                address: allowance["grantee"],
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

  // fetch granter from selected network and data provider
  const fetchGranter = async () => {

    let iri: string
    let isPolicyAddress: boolean

    // handle grantee as policy, otherwise member
    try {

      // fetch policy from selected network
      await fetch(chainInfo.rest + "/" + queryPolicy + "/" + allowance["granter"])
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            // throw error to trigger catch
            throw Error(res.message)
          } else {
            isPolicyAddress = true
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
            const found = res["members"].find(m => m["member"]["address"] === allowance["granter"])
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
              setError("unsupported metadata schema")
            } else {
              setError("")
              setGranter({
                isPolicyAddress,
                address: allowance["granter"],
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
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>
          {"granter"}
        </h3>
        {granter ? (
          <p>
            {`${granter["name"]} (`}
              <Link to={`/${granter.isPolicyAddress ? "policies" : "members"}/?address=${granter["address"]}`}>
                {granter["address"]}
              </Link>
            {")"}
          </p>
        ) : (
          <p>
            {allowance["granter"]}
          </p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>
          {"grantee"}
        </h3>
        {grantee ? (
          <p>
            {`${grantee["name"]} (`}
              <Link to={`/${grantee.isPolicyAddress ? "policies" : "members"}/?address=${grantee["address"]}`}>
                {grantee["address"]}
              </Link>
            {")"}
          </p>
        ) : (
          <p>
            {allowance["grantee"]}
          </p>
        )}
      </div>
      {allowance["allowance"]["@type"] === "/cosmos.feegrant.v1beta1.BasicAllowance" && (
        <>
          {allowance["allowance"]["spend_limit"].map((spendLimit, i) => (
            <div className={styles.boxText} key={i}>
              <h3>
                {"spend limit"}
              </h3>
              <p>
                {spendLimit["amount"] + spendLimit["denom"]}
              </p>
            </div>
          ))}
          <div className={styles.boxText}>
            <h3>
              {"expiration"}
            </h3>
            <p>
              {formatTimestamp(allowance["allowance"]["expiration"])}
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default FeegrantAllowance
