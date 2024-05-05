import { CreditType } from 'cosmos/api/regen/ecocredit/v1/state'
import { MsgAddCreditType as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputNumber, InputString } from '..'

const MsgAddCreditType = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [authority, setAuthority] = useState<string>('')
  const [creditTypeAbbrev, setCreditTypeAbbrev] = useState<string>('')
  const [creditTypeName, setCreditTypeName] = useState<string>('')
  const [creditTypeUnit, setCreditTypeUnit] = useState<string>('')
  const [creditTypePrecision, setCreditTypePrecision] = useState<number>(6)

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgAddCreditType',
      authority: wallet ? wallet.bech32Address : authority,
      creditType: CreditType.fromJSON({
        abbreviation: creditTypeAbbrev,
        name: creditTypeName,
        unit: creditTypeUnit,
        precision: creditTypePrecision,
      }),
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgAddCreditType',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [
    authority,
    creditTypeAbbrev,
    creditTypeName,
    creditTypeUnit,
    creditTypePrecision,
    wallet,
  ])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-add-credit-type-authority"
          label="authority"
          long={true}
          network={network}
          address={authority}
          setAddress={setAuthority}
        />
      )}
      <InputString
        id="msg-add-credit-type-credit-abbreviation"
        label="credit type abbreviation"
        placeholder="C"
        string={creditTypeAbbrev}
        setString={setCreditTypeAbbrev}
      />
      <InputString
        id="msg-add-credit-type-credit-type-name"
        label="credit type name"
        placeholder="Carbon"
        string={creditTypeName}
        setString={setCreditTypeName}
      />
      <InputString
        id="msg-add-credit-type-credit-type-unit"
        label="credit type unit"
        placeholder="metric ton CO2 equivelant"
        string={creditTypeUnit}
        setString={setCreditTypeUnit}
      />
      <InputNumber
        id="msg-add-credit-type-credit-type-precision"
        label="credit type precision"
        disabled={true}
        number={creditTypePrecision}
        setNumber={setCreditTypePrecision}
      />
    </>
  )
}

export default MsgAddCreditType
