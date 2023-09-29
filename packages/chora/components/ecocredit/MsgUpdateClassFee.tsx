import * as React from 'react'
import { useEffect, useState } from 'react'

import { MsgUpdateClassFee as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'

import InputAddress from '../InputAddress'
import InputString from '../InputString'

const MsgUpdateClassFee = ({ network, setMessage, useWallet, wallet }: any) => {
  const [authority, setAuthority] = useState<string>('')
  const [feeDenom, setFeeDenom] = useState<string>('')
  const [feeAmount, setFeeAmount] = useState<string>('')

  useEffect(() => {
    const msg = {
      authority: wallet ? wallet.bech32Address : authority,
      fee: {
        denom: feeDenom,
        amount: feeAmount,
      },
    } as unknown as Msg

    const msgAny = {
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
