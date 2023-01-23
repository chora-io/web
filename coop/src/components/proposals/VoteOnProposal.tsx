import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"
import * as jsonld from "jsonld"

import { WalletContext } from "chora"
import { MsgVote } from "chora/api/cosmos/group/v1/tx"
import { Exec } from "chora/api/cosmos/group/v1/types"
import { signAndBroadcast } from "chora/utils/tx"

import InputString from "chora/components/InputString"
import ResultTx from "chora/components/ResultTx"
import SelectExecution from "chora/components/SelectExecution"
import SelectVote from "chora/components/SelectVote"

import * as styles from "./VoteOnProposal.module.css"

const serverUrl = "https://server.chora.io"

const VoteOnProposal = ({ proposalId }) => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [vote, setVote] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [execution, setExecution] = useState<number>(Exec["EXEC_UNSPECIFIED"])

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    // set doc
    const doc = {
      "@context": "https://schema.chora.io/contexts/group_vote.jsonld",
      reason: reason,
    }

    // check and normalize JSON-LD
    const normalized = await jsonld.normalize(doc, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
    }).catch(err => {
      setError(err.message)
      return
    })

    if (normalized == "") {
      setError("JSON-LD empty after normalized")
      return
    }

    const body = {
      canon: "URDNA2015",
      context: "https://schema.chora.io/contexts/group_vote.jsonld",
      digest: "BLAKE2B_256",
      jsonld: JSON.stringify(doc),
      merkle: "UNSPECIFIED"
    }

    let iri: string

    await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          iri = data["iri"]
        }
      })
      .catch(err => {
        setError(err.message)
      })

    const msg = {
      $type: "cosmos.group.v1.MsgVote",
      voter: wallet.bech32Address,
      proposalId: Long.fromString(proposalId),
      option: vote,
      metadata: iri,
      exec: execution,
    } as MsgVote

    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgVote",
      value: MsgVote.encode(msg).finish(),
    }

    await signAndBroadcast(chainInfo, wallet["bech32Address"], [msgAny])
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
          <SelectVote
            id="vote-option"
            label="vote option"
            vote={vote}
            setVote={setVote}
          />
          <InputString
            id="vote-reason"
            label="vote reason"
            placeholder="This proposal needs to be amended and resubmitted."
            string={reason}
            setString={setReason}
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

export default VoteOnProposal
