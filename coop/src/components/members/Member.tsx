import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import { formatTimestamp } from "chora/utils/timestamp"

import * as styles from "./Member.module.css"

const groupId = "1" // TODO: configuration file
const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query
const serverUrl = "https://server.chora.io"

const Member = ({ memberAddress }) => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [member, setMember] = useState<any>(null)
  const [metadata, setMetadata] = useState<any>(null)

  useEffect(() => {
    setMember(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch members if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchMemberAndMetadata = async () => {

        // member metadata
        let iri: string

        // fetch members from selected network
        await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              const member = res["members"].find(m => m["member"]["address"] === memberAddress)
              setMember(member["member"])
              iri = member["member"]["metadata"]
            }
          })

        // return if iri is empty or was never set
        if (typeof iri === "undefined" || iri === "") {
          setMetadata({ name: "NA" })
          return
        }

        // fetch member data from chora server
        await fetch(serverUrl + "/" + iri)
          .then(res => res.json())
          .then(res => {
            if (res.error) {
              setError(res.error)
              setMetadata(null)
            } else if (res.context !== "https://schema.chora.io/contexts/group_member.jsonld") {
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
      fetchMemberAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
      {!member && !metadata && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {member && metadata && !error && (
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
              {"address"}
            </h3>
            <p>
              {member["address"]}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"added at"}
            </h3>
            <p>
              {formatTimestamp(member["added_at"])}
            </p>
          </div>
          <div className={styles.item}>
            <h3>
              {"weight"}
            </h3>
            <p>
              {member["weight"]}
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

export default Member
