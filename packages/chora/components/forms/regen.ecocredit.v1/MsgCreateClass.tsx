import { Coin } from 'cosmos/api/cosmos/base/v1beta1/coin'
import { MsgCreateClass as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputString } from '..'
import { InputIssuers } from '.'

const MsgCreateClass = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [issuers, setIssuers] = useState<any[]>([])
  const [metadata, setMetadata] = useState<string>('')
  const [creditTypeAbbrev, setCreditTypeAbbrev] = useState<string>('')
  const [feeDenom, setFeeDenom] = useState<string>('')
  const [feeAmount, setFeeAmount] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgCreateClass',
      admin: wallet ? wallet.bech32Address : admin,
      issuers: issuers.map((issuer: any) => issuer.address),
      metadata: metadata,
      creditTypeAbbrev: creditTypeAbbrev,
      fee: Coin.fromJSON({ denom: feeDenom, amount: feeAmount }),
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgCreateClass',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, issuers, metadata, creditTypeAbbrev, feeDenom, feeAmount, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-create-class-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputString
        id="msg-create-class-credit-type"
        label="credit type"
        placeholder="C"
        string={creditTypeAbbrev}
        setString={setCreditTypeAbbrev}
      />
      <InputIRI
        id="msg-create-class-metadata"
        label="metadata"
        network={network}
        iri={metadata}
        setIri={setMetadata}
      />
      <InputIssuers
        id="msg-create-class-issuers"
        label="issuers"
        issuers={issuers}
        setIssuers={setIssuers}
      />
      <InputString
        id="msg-create-class-fee-denom"
        label="fee denom"
        placeholder="uregen"
        string={feeDenom}
        setString={setFeeDenom}
      />
      <InputString
        id="msg-create-class-fee-amount"
        label="fee amount"
        placeholder="20000000"
        string={feeAmount}
        setString={setFeeAmount}
      />
    </>
  )
}

export default MsgCreateClass
