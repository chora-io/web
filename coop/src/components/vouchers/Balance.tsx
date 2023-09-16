import * as React from "react"
import { useContext, useEffect, useState } from "react"
import { Link } from "gatsby"

import { WalletContext } from "chora"
import { useCoopParams } from "../../hooks/coop"
import { formatTimestamp } from "chora/utils"

import { Result } from "chora/components"

import * as styles from "./Balance.module.css"

const queryBalance = "chora/voucher/v1/balance"
const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query

const Balance = ({ voucherId, address }) => {

  const { chainInfo, network } = useContext(WalletContext)

  const [groupId, serverUrl] = useCoopParams(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [balance, setBalance] = useState<any>(undefined)
  const [holder, setHolder] = useState<any>(undefined)

  // reset state on voucher or network change
  useEffect(() => {
    setError(undefined)
    setBalance(undefined)
    setHolder(undefined)
  }, [voucherId, address, chainInfo?.chainId]);

  // fetch on load and voucher, address, or group change
  useEffect(() => {

    // fetch balance from selected network
    if (groupId) {
      fetchBalance().catch(err => {
        setError(err.message)
      })
    }
  }, [voucherId, address, groupId])

  // fetch balance from selected network
  const fetchBalance = async () => {

    let balance: any

    // fetch balance from selected network
    await fetch(chainInfo.rest + "/" + queryBalance + "/" + voucherId + "/" + address)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          balance = res
          setBalance(res)
        }
      })

    // TODO(cosmos-sdk): query member by group id and member address

    let member: any

    // fetch members from selected network
    await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          const holder = balance["address"]
          const found = res["members"].find(member => member["member"]["address"] === holder)
          if (found) {
            member = found["member"]
          }
        }
      })

    // fetch member metadata from data provider
    await fetch(serverUrl + "/data/" + member["metadata"])
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError(res.error)
        } else {
          const data = JSON.parse(res["jsonld"])
          if (data["@context"] !== "https://schema.chora.io/contexts/group_member.jsonld") {
            setError("unsupported metadata schema")
          } else {
            setError("")
            setHolder({
              address: member["address"],
              name: data["name"],
            })
          }
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      {!balance && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {balance && (
        <div className={styles.boxItem}>
          {holder ? (
            <div className={styles.boxText}>
              <h3>
                {"address"}
              </h3>
              <p key={holder["address"]}>
                {`${holder["name"]} (`}
                <Link to={`/members/?address=${holder["address"]}`}>
                  {holder["address"]}
                </Link>
                {")"}
              </p>
            </div>
          ) : (
            <div className={styles.boxText}>
              <h3>
                {"address"}
              </h3>
              <p>
                {balance["address"]}
              </p>
            </div>
          )}
          <div className={styles.boxText}>
            <h3>
              {"total amount"}
            </h3>
            <p>
              {balance["total_amount"]}
            </p>
          </div>
          {balance["amounts"].map(balance => (
            <div className={styles.boxItemSub} key={balance["expiration"]}>
              <div className={styles.boxText}>
                <h3>
                  {"amount"}
                </h3>
                <p>
                  {balance["amount"]}
                </p>
              </div>
              <div className={styles.boxText}>
                <h3>
                  {"expiration"}
                </h3>
                <p>
                  {formatTimestamp(balance["expiration"])}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Balance
