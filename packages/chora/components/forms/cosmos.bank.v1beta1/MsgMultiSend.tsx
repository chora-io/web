import { MsgMultiSend as Msg } from '@keplr-wallet/proto-types/cosmos/bank/v1beta1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputDenom, InputNumber } from '..'

const MsgMultiSend = ({ network, setMessage, useWallet, wallet }: any) => {
  const [fromAddress, setFromAddress] = useState<string>('')
  const [toAddress, setToAddress] = useState<string>('')
  const [denom, setDenom] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      inputs: [
        {
          address: wallet ? wallet.bech32Address : fromAddress,
          coins: [
            {
              denom: denom,
              amount: amount,
            },
          ],
        },
      ],
      outputs: [
        {
          address: toAddress,
          coins: [
            {
              denom: denom,
              amount: amount,
            },
          ],
        },
      ],
    }

    const msgAny = {
      typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [fromAddress, toAddress, amount, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-multi-send-from-address"
          label="from address"
          long={true}
          network={network}
          address={fromAddress}
          setAddress={setFromAddress}
        />
      )}
      <InputAddress
        id="msg-multi-send-to-address"
        label="to address"
        network={network}
        address={toAddress}
        setAddress={setToAddress}
      />
      <InputDenom
        id="msg-multi-send-denom"
        label="denom"
        network={network}
        denom={denom}
        setDenom={setDenom}
      />
      <InputNumber
        id="msg-multi-send-amount"
        label="amount"
        number={amount}
        setNumber={setAmount}
      />
    </>
  )
}

export default MsgMultiSend
