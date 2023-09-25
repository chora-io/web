import Link from "next/link"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { Result } from "chora/components"
import { useNetworkServer } from "chora/hooks"

import { useNetworkCoop } from "@hooks"

import styles from "./Balances.module.css"

const queryBalances = "chora/voucher/v1/balances-by-voucher"
const queryMembers = "cosmos/group/v1/group_members" // TODO(cosmos-sdk): group member query

const Balances = ({ voucherId }: any) => {

  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [balances, setBalances] = useState<any[] | undefined>(undefined)
  const [holders, setHolders] = useState<any[] | undefined>(undefined)

  // reset state on voucher or network change
  useEffect(() => {
    setError(undefined)
    setBalances(undefined)
    setHolders(undefined)
  }, [voucherId, chainInfo?.chainId]);

  // fetch on load and voucher or group change
  useEffect(() => {

    // fetch balances from selected network
    if (groupId) {
      fetchBalances().catch(err => {
        setError(err.message)
      })
    }
  }, [voucherId, groupId])

  // fetch on load and voucher or group change
  useEffect(() => {

    // fetch holders from selected network and network server
    if (groupId && balances?.length) {
      fetchHolders().catch(err => {
        setError(err.message)
      })
    }
  }, [groupId, balances?.length])

  // fetch balances from selected network
  const fetchBalances = async () => {

    // fetch balances from selected network
    await fetch(chainInfo.rest + "/" + queryBalances + "/" + voucherId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          setBalances(res["total_amounts"])
        }
      })
  }

  // fetch holders from selected network and network server
  const fetchHolders = async () => {

    // TODO(cosmos-sdk): query member by group id and member address

    let members: any[] = []

    if (balances?.length) {

      // fetch members from selected network
      await fetch(chainInfo.rest + "/" + queryMembers + "/" + groupId)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            for (let i = 0; i < balances.length; i++) {
              const holder = balances[i]["address"]
              const totalAmount = balances[i]["total_amount"]
              const found = res["members"].find((member: any) => member["member"]["address"] === holder)
              if (found) {
                members.push({ "total_amount": totalAmount, ...found["member"] })
              }
            }
          }
        })
    }

    let holders: any[] = []

    const promise = members.map(async member => {

      // fetch member metadata from network server
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
              holders.push({
                address: member["address"],
                name: data["name"],
                total_amount: member["total_amount"],
              })
            }
          }
        })
        .catch(err => {
          setError(err.message)
        })
    })

    // set state after promise all complete
    await Promise.all(promise).then(() => {
      setHolders(holders)
    })
  }

  return (
    <div className={styles.box}>
      {!error && !balances && (
        <div>
          {"loading..."}
        </div>
      )}
      {!error && balances && balances.length === 0 && (
        <div>
          {"no balances found"}
        </div>
      )}
      {!holders && balances && balances.map(balance => (
        <div className={styles.boxItem} key={balance["address"]}>
          <div className={styles.boxText}>
            <h3>
              {"address"}
            </h3>
            <p>
              {balance["address"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"total amount"}
            </h3>
            <p>
              {balance["total_amount"]}
            </p>
          </div>
          <Link href={`/vouchers/?id=${voucherId}&address=${balance["address"]}`}>
            {"view balance"}
          </Link>
        </div>
      ))}
      {holders && holders.map(holder => (
        <div className={styles.boxItem} key={holder["address"]}>
          <div className={styles.boxText}>
            <h3>
              {"address"}
            </h3>
            <p key={holder["address"]}>
              {`${holder["name"]} (`}
              <Link href={`/members/?address=${holder["address"]}`}>
                {holder["address"]}
              </Link>
              {")"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"total amount"}
            </h3>
            <p>
              {holder["total_amount"]}
            </p>
          </div>
          <Link href={`/vouchers/?id=${voucherId}&address=${holder["address"]}`}>
            {"view balance"}
          </Link>
        </div>
      ))}
      <Result error={error} />
    </div>
  )
}

export default Balances
