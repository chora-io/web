import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"
import * as jsonld from "jsonld"

import { WalletContext } from "chora"
import { MsgVote } from "chora/api/cosmos/group/v1/tx"
import { InputString, ResultTx } from "chora/components"
import { SelectExecution, SelectVote } from "chora/components/group"
import { signAndBroadcast } from "chora/utils"

import * as styles from "./VoteOnProposal.module.css"

const serverUrl = "https://server.chora.io/data"

const VoteOnProposal = ({ proposalId }) => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [vote, setVote] = useState<string>("")
  const [reason, setReason] = useState<string>("")
  const [execution, setExecution] = useState<string>("")

  // form error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  // submit vote asynchronously
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    // set JSON-LD document
    const doc = {
      "@context": "https://schema.chora.io/contexts/group_vote.jsonld",
      reason: reason,
    }

    // check and normalize JSON-LD document
    const normalized = await jsonld.normalize(doc, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
    }).catch(err => {
      setError(err.message)
      return
    })

    // return error if empty
    if (normalized == "") {
      setError("JSON-LD empty after normalized")
      return
    }

    // set post request body
    const body = {
      canon: "URDNA2015",
      context: "https://schema.chora.io/contexts/group_vote.jsonld",
      digest: "BLAKE2B_256",
      jsonld: JSON.stringify(doc),
      merkle: "UNSPECIFIED"
    }

    let iri: string

    // post data to chora server
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

    // return error if iri never set
    if (typeof iri === "undefined") {
      return
    }

    // set submit proposal message
    const msg = {
      $type: "cosmos.group.v1.MsgVote",
      voter: wallet.bech32Address,
      proposalId: Long.fromString(proposalId),
      option: vote,
      metadata: iri,
      exec: execution,
    } as MsgVote

    // convert message to any message
    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgVote",
      value: MsgVote.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet["bech32Address"], [msgAny])
      .then(res => {
        setSuccess(res)
      }).catch(err => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
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
      {(success || error) && (
        <div className={styles.boxResultBelow}>
          <ResultTx
            error={error}
            rest={chainInfo?.rest}
            success={success}
          />
        </div>
      )}
    </div>
  )
}

export default VoteOnProposal
