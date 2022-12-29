import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"

import { WalletContext } from "../../contexts/WalletContext"
import { MsgUpdateGroupMembers } from "../../../api/cosmos/group/v1/tx"
import { signAndBroadcast } from "../../utils/tx"

import InputNumber from "../InputNumber"
import InputMembers from "../InputMembers"
import ResultTx from "../ResultTx"

import * as styles from "./MsgUpdateGroupAdmin.module.css"

type member = {
  address: string;
  weight: string;
  metadata: string;
}

const member = {
  address: "",
  weight: "",
  metadata: "",
}

const MsgUpdateGroupMembersView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")
  const [updates, setUpdates] = useState<member[]>([member])

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "cosmos.group.v1.MsgUpdateGroupMembers",
      admin: wallet.bech32Address,
      groupId: Long.fromString(id),
      memberUpdates: updates,
    } as MsgUpdateGroupMembers

    const encMsg = MsgUpdateGroupMembers.encode(msg).finish()

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
          <InputMembers
            label="update"
            members={updates}
            setMembers={setUpdates}
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

export default MsgUpdateGroupMembersView
