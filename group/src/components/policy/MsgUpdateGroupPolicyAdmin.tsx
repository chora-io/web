import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { MsgUpdateGroupPolicyAdmin } from "chora/api/cosmos/group/v1/tx"
import { signAndBroadcast } from "chora/utils/tx"

import InputAddress from "chora/components/InputAddress"
import ResultTx from "chora/components/ResultTx"

import * as styles from "./MsgCreateGroupPolicy.module.css"

const MsgUpdateGroupPolicyAdminView = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // form input
  const [address, setAddress] = useState<string>("")
  const [admin, setAdmin] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "cosmos.group.v1.MsgUpdateGroupPolicyAdmin",
      admin: wallet.bech32Address,
      groupPolicyAddress: address,
      newAdmin: admin,
    } as MsgUpdateGroupPolicyAdmin

    const encMsg = MsgUpdateGroupPolicyAdmin.encode(msg).finish()

    await signAndBroadcast(chainInfo, wallet.bech32Address, msg, encMsg)
      .then(res => {
        setSuccess(res)
      }).catch(err => {
        setError(err.message)
      })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputAddress
            id="policy-address"
            label="policy address"
            network={network}
            long={true}
            address={address}
            setAddress={setAddress}
          />
          <InputAddress
            id="new-policy-admin"
            label="new policy admin"
            network={network}
            address={admin}
            setAddress={setAdmin}
          />
          <button type="submit">
            {"submit"}
          </button>
        </form>
      </div>
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </>
  )
}

export default MsgUpdateGroupPolicyAdminView
