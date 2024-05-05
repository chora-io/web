import { Coin } from 'cosmos/api/cosmos/base/v1beta1/coin'
import { MsgCreate as Msg } from 'cosmos/api/regen/ecocredit/basket/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputString } from '..'

const MsgCreate = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [curator, setCurator] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [creditTypeAbbrev, setCreditTypeAbbrev] = useState<string>('')
  const [allowedClass, setAllowedClass] = useState<string>()
  const [feeDenom, setFeeDenom] = useState<string>('')
  const [feeAmount, setFeeAmount] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.basket.v1.MsgCreate',
      curator: wallet ? wallet.bech32Address : curator,
      name: name,
      description: description,
      exponent: 0, // deprecated
      disableAutoRetire: false,
      creditTypeAbbrev: creditTypeAbbrev,
      allowedClasses: allowedClass ? [allowedClass] : [],
      fee: [Coin.fromJSON({ denom: feeDenom, amount: feeAmount })],
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.basket.v1.MsgCreate',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [curator, feeDenom, feeAmount, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-create-curator"
          label="curator"
          long={true}
          network={network}
          address={curator}
          setAddress={setCurator}
        />
      )}
      <InputString
        id="msg-create-name"
        label="basket name"
        placeholder="NCT"
        string={name}
        setString={setName}
      />
      <InputString
        id="msg-create-description"
        label="basket description"
        placeholder="Nature Carbon Ton"
        string={description}
        setString={setDescription}
      />
      <InputString
        id="msg-create-credit-type-abbrev"
        label="credit type abbrev"
        placeholder="C"
        string={creditTypeAbbrev}
        setString={setCreditTypeAbbrev}
      />
      <InputString
        id="msg-create-allowed-classes"
        label="allowed classes"
        placeholder="C03"
        string={allowedClass}
        setString={setAllowedClass}
      />
      <InputString
        id="msg-create-fee-denom"
        label="fee denom"
        placeholder="uregen"
        string={feeDenom}
        setString={setFeeDenom}
      />
      <InputString
        id="msg-create-fee-amount"
        label="fee amount"
        placeholder="20000000"
        string={feeAmount}
        setString={setFeeAmount}
      />
    </>
  )
}

export default MsgCreate
