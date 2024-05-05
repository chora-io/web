import { Coin } from 'cosmos/api/cosmos/base/v1beta1/coin'
import { MsgUpdateClassFee as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputString } from '..'

const MsgUpdateClassFee = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [authority, setAuthority] = useState<string>('')
  const [feeDenom, setFeeDenom] = useState<string>('')
  const [feeAmount, setFeeAmount] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgUpdateClassFee',
      authority: wallet ? wallet.bech32Address : authority,
      fee: Coin.fromJSON({
        denom: feeDenom,
        amount: feeAmount,
      }),
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgUpdateClassFee',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [authority, feeDenom, feeAmount, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-update-class-fee-authority"
          label="authority"
          long={true}
          network={network}
          address={authority}
          setAddress={setAuthority}
        />
      )}
      <InputString
        id="msg-update-class-fee-fee-denom"
        label="fee denom"
        placeholder="uregen"
        string={feeDenom}
        setString={setFeeDenom}
      />
      <InputString
        id="msg-update-class-fee-fee-amount"
        label="fee amount"
        placeholder="20000000"
        string={feeAmount}
        setString={setFeeAmount}
      />
    </>
  )
}

export default MsgUpdateClassFee
