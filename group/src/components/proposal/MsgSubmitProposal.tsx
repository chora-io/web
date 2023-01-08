import * as React from "react"
import { useContext, useState } from "react"

import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx"

import { WalletContext } from "chora"
import { signAndBroadcast } from "chora/utils/tx"
import InputAddress from "chora/components/InputAddress"
import InputIRI from "chora/components/InputIRI"
import ResultTx from "chora/components/ResultTx"

import { MsgSubmitProposal } from "../../../api/cosmos/group/v1/tx"

import InputMessages from "../InputMessages"
import SelectExecution from "../SelectExecution"

import { Exec } from "../../../api/cosmos/group/v1/types"

import * as styles from "./MsgSubmitProposal.module.css"

const MsgSubmitProposalView = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // form input
  const [address, setAddress] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [messages, setMessages] = useState<string>("")
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
      messages: JSON.parse(messages).map(msg => ({
        typeUrl: msg.typeUrl,
        value: MsgSend.encode(msg.value).finish(),
      })),
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
          <InputMessages
            id="proposal-messages"
            label="proposal messages"
            messages={messages}
            setMessages={setMessages}
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

export default MsgSubmitProposalView
