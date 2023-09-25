import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { Result } from "chora/components"
import { useNetworkServer } from "chora/hooks"
import { formatTimestamp } from "chora/utils"

import { useNetworkCoop } from "@hooks"

import styles from "./Member.module.css"

const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query

const Member = ({ memberAddress }: any) => {

  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [member, setMember] = useState<any>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)

  // reset state on address or network change
  useEffect(() => {
    setError(undefined)
    setMember(undefined)
    setMetadata(undefined)
  }, [memberAddress, chainInfo?.chainId]);

  // fetch on load and address or group change
  useEffect(() => {

    // fetch member from selected network
    if (groupId) {
      fetchMember().catch(err => {
        setError(err.message)
      })
    }
  }, [memberAddress, groupId])

  // fetch on load and member metadata change
  useEffect(() => {

    // fetch member metadata from network server
    if (member?.metadata) {
      fetchMemberMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [member?.metadata])

  // fetch member from selected network
  const fetchMember = async () => {

    // TODO(cosmos-sdk): query member by group id and member address

    // fetch members from selected network
    await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          const found = res["members"].find((m: any) => m["member"]["address"] === memberAddress)
          if (found) {
            setMember(found["member"])
          }
        }
      })
  }

  // fetch member metadata from network server
  const fetchMemberMetadata = async () => {

    // TODO: handle multiple metadata formats (i.e. IRI, IPFS, JSON, etc.)

    // handle metadata as json, otherwise chora server iri
    try {

      // parse member metadata
      const parsedMetadata = JSON.parse(member.metadata)
      setMetadata(parsedMetadata)

    } catch(e) {

      // do nothing with error

      // fetch member metadata from network server
      await fetch(serverUrl + "/data/" + member.metadata)
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

  return (
    <div className={styles.box}>
      <div>
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
            {"address"}
          </h3>
          <p>
          {member && member["address"] ? member["address"] : "NA"}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>
            {"added at"}
          </h3>
          <p>
          {member && member["added_at"] ? formatTimestamp(member["added_at"]) : "NA"}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>
            {"weight"}
          </h3>
          <p>
            {member && member["weight"] ? member["weight"] : "NA"}
          </p>
        </div>
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Member
