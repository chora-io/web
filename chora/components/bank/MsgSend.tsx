import * as React from "react"
import { useEffect, useState } from "react"

import { MsgSend as Msg } from "@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx"

import InputAddress from "../InputAddress"
import InputDenom from "../InputDenom"
import InputNumber from "../InputNumber"

const MsgSend = ({ network, setMessage, useWallet, wallet }: any) => {

  const [fromAddress, setFromAddress] = useState<string>("")
  const [toAddress, setToAddress] = useState<string>("")
  const [denom, setDenom] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  useEffect(() => {

    const msg = {
      fromAddress: wallet ? wallet.bech32Address : fromAddress,
      toAddress: toAddress,
      amount: [
        {
          denom: denom,
          amount: amount,
        }
      ],
    } as Msg

    const msgAny = {
        typeUrl: "/cosmos.bank.v1beta1.MsgSend",
        value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [fromAddress, toAddress, amount, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-send-from-address"
          label="from address"
          long={true}
          network={network}
          address={fromAddress}
          setAddress={setFromAddress}
        />
      )}
      <InputAddress
        id="msg-send-to-address"
        label="to address"
        network={network}
        address={toAddress}
        setAddress={setToAddress}
      />
      <InputDenom
        id="msg-send-denom"
        label="denom"
        network={network}
        denom={denom}
        setDenom={setDenom}
      />
      <InputNumber
        id="msg-send-amount"
        label="amount"
        number={amount}
        setNumber={setAmount}
      />
    </>
  )
}

export default MsgSend
