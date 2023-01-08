import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"

import { WalletContext } from "chora"
import { signAndBroadcast } from "chora/utils/tx"
import InputAddress from "chora/components/InputAddress"
import InputNumber from "chora/components/InputNumber"
import ResultTx from "chora/components/ResultTx"

import { MsgUpdateGroupAdmin } from "../../../api/cosmos/group/v1/tx"

import * as styles from "./MsgUpdateGroupAdmin.module.css"

const MsgUpdateGroupAdminView = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")
  const [admin, setAdmin] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "cosmos.group.v1.MsgUpdateGroupAdmin",
      admin: wallet.bech32Address,
      groupId: Long.fromString(id),
      newAdmin: admin,
    } as MsgUpdateGroupAdmin

    const encMsg = MsgUpdateGroupAdmin.encode(msg).finish()

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
          <InputNumber
            id="group-id"
            label="group id"
            number={id}
            setNumber={setId}
          />
          <InputAddress
            id="new-admin"
            label="new admin"
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

export default MsgUpdateGroupAdminView
