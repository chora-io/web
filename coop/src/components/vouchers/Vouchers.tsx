import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraLocal, choraTestnet } from "chora/chains"

import VoucherPreview from "./VoucherPreview"

import * as styles from "./Vouchers.module.css"

const groupId = "1" // TODO: configuration file
const queryVouchers = "chora/voucher/v1/vouchers-by-issuer"
const queryPolicies = "cosmos/group/v1/group_policies_by_group"

const Vouchers = () => {

  const { chainInfo } = useContext(WalletContext)

  // fetch error and results
  const [error, setError] = useState<string>("")
  const [vouchers, setVouchers] = useState<any>(null)

  // fetch on load and value change
  useEffect(() => {
    setVouchers(null)
    setError("")

    const coopChain = chainInfo && (
        chainInfo.chainId !== choraTestnet.chainId ||
        chainInfo.chainId !== choraLocal.chainId
    )

    // error if network is not chora-testnet-1 (or chora-local)
    if (!coopChain) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies and vouchers if network is chora-testnet-1 (or chora-local)
    if (coopChain) {

      // call async function
      fetchPoliciesAndVouchers().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])


  // async function workaround
  const fetchPoliciesAndVouchers = async () => {

    let addrs: string[] = []

    // fetch policies from selected network
    await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          res["group_policies"].map(policy => {
            addrs.push(policy["address"])
          })
        }
      })

    const vs: any[] = []

    // create promise for all async fetch calls
    const promise = addrs.map(async addr => {

      // fetch vouchers from selected network
      await fetch(chainInfo.rest + "/" + queryVouchers + "/" + addr)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            setError(res.message)
          } else {
            res["vouchers"].map(v => vs.push({ issuer: addr, ...v }))
          }
        })
    })

    // set state after promise all complete
    await Promise.all(promise).then(() => {
      setVouchers(vs)
    })
  }

  return (
    <div className={styles.box}>
      {!vouchers && !error && (
        <div>
          {"loading..."}
        </div>
      )}
      {vouchers && vouchers.map(voucher => (
        <VoucherPreview
          key={voucher["id"]}
          voucher={voucher}
        />
      ))}
      {vouchers && vouchers.length === 0 && !error && (
        <div>
          {"no vouchers found"}
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

export default Vouchers
