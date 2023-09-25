import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgExec as Msg } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputNumber from "../InputNumber"

const MsgExec = ({ network, setMessage, useWallet, wallet }: any) => {
  const [executor, setExecutor] = useState<string>("")
  const [proposalId, setProposalId] = useState<string>("")

  useEffect(() => {
    const msg = {
      executor: wallet ? wallet.bech32Address : executor,
      proposalId: Long.fromString(proposalId || "0"),
    } as unknown as Msg

    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgExec",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [executor, proposalId, wallet])

  return (
    <>
      <InputNumber
        id="msg-exec-proposal-id"
        label="proposal id"
        number={proposalId}
        setNumber={setProposalId}
      />
      {!useWallet &&
        <InputAddress
          id="msg-exec-executor"
          label="executor"
          long={true}
          network={network}
          address={executor}
          setAddress={setExecutor}
        />
      }
    </>
  )
}

export default MsgExec
