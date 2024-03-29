import { MsgCreate as Msg } from 'cosmos/api/regen/ecocredit/basket/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import InputAddress from '../InputAddress'
import InputString from '../InputString'

const MsgCreate = ({ network, setMessage, useWallet, wallet }: any) => {
  const [curator, setCurator] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [creditTypeAbbrev, setCreditTypeAbbrev] = useState<string>('')
  const [allowedClasses, setAllowedClasses] = useState<string>('')
  const [feeDenom, setFeeDenom] = useState<string>('')
  const [feeAmount, setFeeAmount] = useState<string>('')

  useEffect(() => {
    const msg = {
      curator: wallet ? wallet.bech32Address : curator,
      name: name,
      description: description,
      creditTypeAbbrev: creditTypeAbbrev,
      allowedClasses: allowedClasses,
      fee: [{ denom: feeDenom, amount: feeAmount }],
    } as unknown as Msg

    const msgAny = {
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
        id="msg-create-desciption"
        label="basket desciption"
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
        string={allowedClasses}
        setString={setAllowedClasses}
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
