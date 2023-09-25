import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { Result } from "chora/components"

import { useNetworkCoop } from "@hooks"
import VoucherPreview from "./VoucherPreview"

import styles from "./Vouchers.module.css"

const queryVouchers = "chora/voucher/v1/vouchers-by-issuer"
const queryPolicies = "cosmos/group/v1/group_policies_by_group"

const Vouchers = () => {

  const { chainInfo } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [vouchers, setVouchers] = useState<any[] | undefined>(undefined)

  // reset state on network change
  useEffect(() => {
    setError(undefined)
    setVouchers(undefined)
  }, [chainInfo?.chainId]);

  // fetch on load and group or network change
  useEffect(() => {

    // fetch policies and vouchers from selected network
    if (groupId) {
      fetchPoliciesAndVouchers().catch(err => {
        setError(err.message)
      })
    }
  }, [groupId, chainInfo?.chainId])

  // fetch policies and vouchers from selected network
  const fetchPoliciesAndVouchers = async () => {

    let addrs: string[] = []

    // fetch policies from selected network
    await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          res["group_policies"].map((policy: any) => {
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
            res["vouchers"].map((v: any) => vs.push({ issuer: addr, ...v }))
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
      {!error && !vouchers && (
        <div>
          {"loading..."}
        </div>
      )}
      {!error && vouchers && vouchers.length === 0 && (
        <div>
          {"no vouchers found"}
        </div>
      )}
      {vouchers && vouchers.map(voucher => (
        <VoucherPreview
          key={voucher["id"]}
          voucher={voucher}
        />
      ))}
      <Result error={error} />
    </div>
  )
}

export default Vouchers
