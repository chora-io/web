import * as React from "react"
import { useEffect, useState } from "react"

import { MsgCreateClass as Msg } from "../../api/regen/ecocredit/v1/tx"

import InputAddress from "../InputAddress"
import InputIRI from "../InputIRI"
import InputString from "../InputString"

const MsgCreateClass = ({ network, setMessage, useWallet, wallet }: any) => {
  const [admin, setAdmin] = useState<string>("")
  const [issuers, setIssuers] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [creditTypeAbbrev, setCreditTypeAbbrev] = useState<string>("")
  const [feeDenom, setFeeDenom] = useState<string>("")
  const [feeAmount, setFeeAmount] = useState<string>("")

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      issuers: [], // TODO
      metadata: metadata,
      creditTypeAbbrev: creditTypeAbbrev,
      fee: { denom: feeDenom, amount: feeAmount },
    } as unknown as Msg

    const msgAny = {
      typeUrl: "/regen.ecocredit.v1.MsgCreateClass",
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
        id="msg-create-class-issuers"
        label="issuers"
        placeholder="[ not implemented ]"
        string={issuers}
        setString={setIssuers}
      />
      <InputIRI
        id="msg-create-class-metadata"
        label="metadata"
        network={network}
        iri={metadata}
        setIri={setMetadata}
      />
      <InputString
        id="msg-create-class-credit-type"
        label="credit type"
        placeholder="C"
        string={creditTypeAbbrev}
        setString={setCreditTypeAbbrev}
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
