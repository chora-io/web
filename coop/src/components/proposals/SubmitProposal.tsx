import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { MsgSubmitProposal } from "chora/api/cosmos/group/v1/tx"
import { Exec } from "chora/api/cosmos/group/v1/types"
import { signAndBroadcast } from "chora/utils/tx"

import InputAddress from "chora/components/InputAddress"
import InputIRI from "chora/components/InputIRI"
import ResultTx from "chora/components/ResultTx"
import SelectExecution from "chora/components/SelectExecution"
import SelectMessage from "chora/components/SelectMessage"

import * as styles from "./SubmitProposal.module.css"

const SubmitProposal = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // form input
  const [address, setAddress] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [execution, setExecution] = useState<number>(Exec["EXEC_UNSPECIFIED"])

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "cosmos.group.v1.MsgSubmitProposal",
      proposers: [wallet.bech32Address],
      groupPolicyAddress: address,
      metadata: metadata,
      messages: [message],
      exec: execution,
    } as MsgSubmitProposal

    const encMsg = MsgSubmitProposal.encode(msg).finish()

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
            id="proposal-metadata"
            label="proposal metadata"
            network={network}
            iri={metadata}
            setIri={setMetadata}
          />
          <SelectMessage
            id="proposal-message"
            label="proposal message"
            setMessage={setMessage}
          />
          <SelectExecution
            id="proposal-execution"
            label="proposal execution"
            execution={execution}
            setExecution={setExecution}
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

export default SubmitProposal
