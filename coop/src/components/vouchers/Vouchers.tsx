import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { choraTestnet } from "chora/utils/chains"

import VoucherPreview from "./VoucherPreview"

import * as styles from "./Vouchers.module.css"

const groupId = "1" // TODO: configuration file
const queryVouchers = "chora/voucher/v1/vouchers-by-issuer"
const queryPolicies = "cosmos/group/v1/group_policies_by_group"

const Vouchers = () => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string>("")
  const [vouchers, setNodes] = useState<any>(null)

  useEffect(() => {
    setNodes(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchPoliciesAndNodes = async () => {

        let addresses: string[] = []

        // fetch policies from selected network
        await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
          .then(res => res.json())
          .then(res => {
            if (res.code) {
              setError(res.message)
            } else {
              res["group_policies"].map(policy => {
                addresses.push(policy["address"])
              })
            }
          })

        addresses && addresses.map(async address => {

          // fetch vouchers from selected network
          await fetch(chainInfo.rest + "/" + queryVouchers + "/" + address)
            .then(res => res.json())
            .then(res => {
              if (res.code) {
                setError(res.message)
              } else if (res["vouchers"].length > 0) {
                const ns = vouchers || []
                res["vouchers"].map(v => ns.push({
                  issuer: address,
                  ...v,
                }))
                setNodes(ns)
              }
            })
        })
      }

      // call async function
      fetchPoliciesAndNodes().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  return (
    <div className={styles.container}>
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
      {error && (
        <div>
          {error}
        </div>
      )}
    </div>
  )
}

export default Vouchers
