import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { formatTimestamp } from "chora/utils"
import { useCoopParams } from "../../hooks/coop"

import { Result } from "chora/components"

import * as styles from "./Group.module.css"

const queryGroup = "cosmos/group/v1/group_info"
const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query
const queryPolicy = "cosmos/group/v1/group_policy_info"

const Group = () => {

  const { chainInfo } = useContext(WalletContext)

  const [groupId, serverUrl] = useCoopParams(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [group, setGroup] = useState<any>(undefined)
  const [metadata, setMetadata] = useState<any>(undefined)
  const [admin, setAdmin] = useState<any>(undefined)

  // reset state on network change
  useEffect(() => {
    setError(undefined)
    setGroup(undefined)
    setMetadata(undefined)
    setAdmin(undefined)
  }, [chainInfo?.chainId]);

  // fetch on load and network change
  useEffect(() => {

    // fetch group from selected network
    if (groupId) {
      fetchGroup().catch(err => {
        setError(err.message)
      })
    }
  }, [groupId])

  // fetch on load and network change
  useEffect(() => {

    // fetch group metadata from data provider
    if (group?.metadata) {
      fetchGroupMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [group?.metadata])

  // fetch on load and network change
  useEffect(() => {

    // fetch group admin metadata from selected network and data provider
    if (group?.admin) {
      fetchGroupAdminMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [group?.admin]);

  // fetch group from selected network
  const fetchGroup = async () => {

    // fetch group from selected network
    await fetch(chainInfo.rest + "/" + queryGroup + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setGroup(res.info)
        }
      })
  }

  // fetch group metadata from data provider
  const fetchGroupMetadata = async () => {

    // TODO: handle multiple metadata formats (i.e. IRI, IPFS, JSON, etc.)

    // handle metadata as json, otherwise metadata as chora server iri
    try {

      // parse group metadata
      const parsedMetadata = JSON.parse(group.metadata)
      setMetadata(parsedMetadata)

    } catch(e) {

      // do nothing with error

      // fetch group metadata from data provider
      await fetch(serverUrl + "/data/" + group.metadata)
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res["jsonld"])
            if (data["@context"] !== "https://schema.chora.io/contexts/group.jsonld") {
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

  // fetch group admin metadata from data provider
  const fetchGroupAdminMetadata = async () => {
    let iri: string

    // handle admin as policy, otherwise member
    try {

      // fetch policy from selected network
      await fetch(chainInfo.rest + "/" + queryPolicy + "/" + group["admin"])
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
            const found = res["members"].find(m => m["member"]["address"] === group["admin"])
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
                address: group["admin"],
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
              {group && group["admin"] ? group["admin"] : "NA"}
            </>
          )}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"created at"}
        </h3>
        <p>
          {group && group["created_at"] ? formatTimestamp(group["created_at"]) : "NA"}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>
          {"version"}
        </h3>
        <p>
          {group && group["version"] ? group["version"] : "NA"}
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

export default Group
