import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../contexts/WalletContext"
import { MsgUpdateGroupPolicyMetadata } from "../../../api/cosmos/group/v1/tx"
import { signAndBroadcast } from "../../utils/tx"

import InputAddress from "../InputAddress"
import InputMetadata from "../InputMetadata"
import ResultTx from "../ResultTx"

import * as styles from "./MsgCreateGroupPolicy.module.css"

const MsgUpdateGroupPolicyMetadataView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [address, setAddress] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "cosmos.group.v1.MsgUpdateGroupPolicyMetadata",
      admin: wallet.bech32Address,
      groupPolicyAddress: address,
      metadata: metadata,
    } as MsgUpdateGroupPolicyMetadata

    const encMsg = MsgUpdateGroupPolicyMetadata.encode(msg).finish()

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
            long={true}
            address={address}
            setAddress={setAddress}
          />
          <InputMetadata
            id="new-policy-metadata"
            label="new policy metadata"
            metadata={metadata}
            setMetadata={setMetadata}
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

export default MsgUpdateGroupPolicyMetadataView
