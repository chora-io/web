import * as React from "react"
import { useEffect, useState } from "react"
import * as Long from "long"

import { MsgWithdrawProposal as Msg } from "../../api/cosmos/group/v1/tx"

import InputAddress from "../InputAddress"
import InputNumber from "../InputNumber"

const MsgWithdrawProposal = ({ network, setMessage, useWallet, wallet }: any) => {
  const [address, setAddress] = useState<string>("")
  const [proposalId, setProposalId] = useState<string>("")

  useEffect(() => {
    const msg = {
      address: wallet ? wallet.bech32Address : address,
      proposalId: Long.fromString(proposalId || "0"),
    } as Msg

    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgWithdrawProposal",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [address, proposalId, wallet])

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
          id="msg-exec-address"
          label="address"
          long={true}
          network={network}
          address={address}
          setAddress={setAddress}
        />
      }
    </>
  )
}

export default MsgWithdrawProposal
