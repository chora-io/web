import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { formatTimestamp } from "chora/utils"

import * as styles from "./AuthzGrant.module.css"

const groupId = "1"
const queryMembers = "cosmos/group/v1/group_members"
const queryPolicy = "cosmos/group/v1/group_policy_info"

const AuthzGrant = ({ grant }) => {

  const { chainInfo, network } = useContext(WalletContext)

  const [error, setError] = useState<string>("")
  const [grantee, setGrantee] = useState<any>(null)
  const [granter, setGranter] = useState<any>(null)

  // TODO: add hook for server url

  // whether network is a local network
  const localChain = network?.includes("-local")

  // chora server (use local server if local network)
  let serverUrl = "http://localhost:3000"
  if (!localChain) {
    serverUrl = "https://server.chora.io"
  }

  useEffect(() => {
    setError("")
    fetchGrantee().catch(err => {
      setError(err.message)
    })
    fetchGranter().catch(err => {
      setError(err.message)
    })
  }, [grant]);

  // fetch authorization grantee
  const fetchGrantee = async () => {

    let iri: string
    let isPolicyAddress: boolean

    // TODO: handle group policy as group member
    if (grant["grantee"].length > 44) {

      isPolicyAddress = true

      // fetch policy from selected network
      await fetch(chainInfo.rest + "/" + queryPolicy + "/" + grant["grantee"])
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            iri = res["info"]["metadata"]
          }
        })
    } else {

      // TODO(cosmos-sdk): query member by group id and member address

      // fetch members from selected network
      await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            const found = res["members"].find(m => m["member"]["address"] === grant["grantee"])
            if (found) {
              iri = found["member"]["metadata"]
            }
          }
        })
    }

    // fetch member data from chora server
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
              address: grant["grantee"],
              name: data["name"]
            })
          }
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  // fetch authorization granter
  const fetchGranter = async () => {

    let iri: string
    let isPolicyAddress: boolean

    // TODO: handle group policy as group member
    if (grant["granter"].length > 44) {

      isPolicyAddress = true

      // fetch policy from selected network
      await fetch(chainInfo.rest + "/" + queryPolicy + "/" + grant["granter"])
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            iri = res["info"]["metadata"]
          }
        })
    } else {

      // TODO(cosmos-sdk): query member by group id and member address

      // fetch members from selected network
      await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            const found = res["members"].find(m => m["member"]["address"] === grant["granter"])
            if (found) {
              iri = found["member"]["metadata"]
            }
          }
        })
    }

   // fetch member from selected network
    await fetch(chainInfo.rest + "/" + queryPolicy + "/" + grant["granter"])
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          iri = res["info"]["metadata"]
        }
      })

    // fetch member data from chora server
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
              address: grant["granter"],
              name: data["name"]
            })
          }
        }
      })
      .catch(err => {
        setError(err.message)
      })
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
            {grant["granter"]}
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
            {grant["grantee"]}
          </p>
        )}
      </div>
      {grant["authorization"]["@type"] === "/cosmos.authz.v1beta1.GenericAuthorization" && (
        <div className={styles.boxText}>
          <h3>
            {"message"}
          </h3>
          <p>
            {grant["authorization"]["msg"]}
          </p>
        </div>
      )}
      <div className={styles.boxText}>
        <h3>
          {"expiration"}
        </h3>
        <p>
          {formatTimestamp(grant["expiration"])}
        </p>
      </div>
    </div>
  )
}

export default AuthzGrant
