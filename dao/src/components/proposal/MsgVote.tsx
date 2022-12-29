import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"

import { WalletContext } from "../../contexts/WalletContext"
import { MsgVote } from "../../../api/cosmos/group/v1/tx"
import { signAndBroadcast } from "../../utils/tx"

import InputMetadata from "../InputMetadata"
import InputNumber from "../InputNumber"
import ResultTx from "../ResultTx"
import SelectExecution from "../SelectExecution"
import SelectVote from "../SelectVote"

import { Exec, VoteOption } from "../../../api/cosmos/group/v1/types"

import * as styles from "./MsgSubmitProposal.module.css"

const MsgVoteView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")
  const [vote, setVote] = useState<number>(VoteOption["VOTE_OPTION_UNSPECIFIED"])
  const [metadata, setMetadata] = useState<string>("")
  const [execution, setExecution] = useState<number>(Exec["EXEC_UNSPECIFIED"])

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "cosmos.group.v1.MsgVote",
      voter: wallet.bech32Address,
      proposalId: Long.fromString(id),
      option: vote,
      metadata: metadata,
      exec: execution,
    } as MsgVote

    const encMsg = MsgVote.encode(msg).finish()

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
            id="proposal-id"
            label="proposal id"
            number={id}
            setNumber={setId}
          />
          <SelectVote
            id="vote-option"
            label="vote option"
            vote={vote}
            setVote={setVote}
          />
          <InputMetadata
            id="vote-metadata"
            label="vote metadata"
            metadata={metadata}
            setMetadata={setMetadata}
          />
          <SelectExecution
            id="vote-execution"
            label="vote execution"
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

export default MsgVoteView
