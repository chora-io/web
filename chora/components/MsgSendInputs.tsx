import * as React from "react"
import { useEffect, useState } from "react"

import { MsgSend } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx"

import InputAddress from "./InputAddress"
import InputAmount from "./InputAmount"

const MsgSendInputs = ({ network, setMessage }: any) => {

  const [fromAddress, setFromAddress] = useState<string>("")
  const [toAddress, setToAddress] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  useEffect(() => {

    const msg = {
        $type: "cosmos.bank.v1beta1.MsgSend",
        fromAddress: fromAddress ? fromAddress : undefined,
        toAddress: toAddress ? toAddress : undefined,
        amount: amount ? amount : undefined,
    } as MsgSend

    const msgAny = {
        typeUrl: "/chora.voucher.v1.MsgIssue",
        value: MsgSend.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [fromAddress, toAddress, amount])

  return (
    <>
      <InputAddress
        id="msg-send-from-address"
        label="from address"
        long={true}
        network={network}
        address={fromAddress}
        setAddress={setFromAddress}
      />
      <InputAddress
        id="msg-send-to-address"
        label="to address"
        long={true}
        network={network}
        address={toAddress}
        setAddress={setToAddress}
      />
      <InputAmount
        id="msg-send-amount"
        label="amount"
        long={true}
        network={network}
        amount={amount}
        setAmount={setAmount}
      />
    </>
  )
}

export default MsgSendInputs
