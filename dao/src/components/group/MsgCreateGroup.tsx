import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../context/WalletContext"
import { MsgCreateGroup } from "../../../api/cosmos/group/v1/tx"
import { signAndBroadcast } from "../../utils/tx"

import InputMembers from "../InputMembers"
import InputMetadata from "../InputMetadata"
import ResultTx from "../ResultTx"

import * as styles from "./MsgCreateGroup.module.css"

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

const MsgCreateGroupView = () => {

  // @ts-ignore
  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [members, setMembers] = useState<member[]>([member])
  const [metadata, setMetadata] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "cosmos.group.v1.MsgCreateGroup",
      admin: wallet.bech32Address,
      members: members,
      metadata: metadata,
    } as MsgCreateGroup

    const encMsg = MsgCreateGroup.encode(msg).finish()

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
          <InputMetadata
            metadata={metadata}
            setMetadata={setMetadata}
          />
          <InputMembers
            members={members}
            setMembers={setMembers}
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

export default MsgCreateGroupView
