import { MsgGrantAllowance as Msg } from 'cosmos/api/cosmos/feegrant/v1beta1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress } from '..'
import { InputAllowance } from '.'

const MsgGrantAllowance = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [granter, setGranter] = useState<string>('')
  const [grantee, setGrantee] = useState<string>('')
  const [allowance, setAllowance] = useState<any>(undefined)

  useEffect(() => {
    const msg: Msg = {
      $type: 'cosmos.feegrant.v1beta1.MsgGrantAllowance',
      granter: wallet ? wallet.bech32Address : granter,
      grantee: grantee,
      allowance: allowance,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/cosmos.feegrant.v1beta1.MsgGrantAllowance',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [granter, grantee, allowance, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-grant-allowance-granter"
          label="granter"
          long={true}
          network={network}
          address={granter}
          setAddress={setGranter}
        />
      )}
      <InputAddress
        id="msg-grant-allowance-grantee"
        label="grantee"
        network={network}
        address={grantee}
        setAddress={setGrantee}
      />
      <InputAllowance
        id="msg-grant-allowance-allowance"
        label="allowance"
        network={network}
        setAllowance={setAllowance}
      />
    </>
  )
}

export default MsgGrantAllowance
