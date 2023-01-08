import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { signAndBroadcast } from "chora/utils/tx"
import InputAddress from "chora/components/InputAddress"
import InputIRI from "chora/components/InputIRI"
import ResultTx from "chora/components/ResultTx"

import { MsgUpdateGroupPolicyMetadata } from "../../../api/cosmos/group/v1/tx"

import * as styles from "./MsgCreateGroupPolicy.module.css"

const MsgUpdateGroupPolicyMetadataView = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

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
            network={network}
            long={true}
            address={address}
            setAddress={setAddress}
          />
          <InputIRI
            id="new-policy-metadata"
            label="new policy metadata"
            network={network}
            iri={metadata}
            setIri={setMetadata}
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
