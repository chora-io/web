import * as React from "react"
import { useEffect, useState } from "react"

import { MsgSealBatch as Msg } from "../../api/regen/ecocredit/v1/tx"

import InputAddress from "../InputAddress"
import InputString from "../InputString"

const MsgSealBatch = ({ network, setMessage, useWallet, wallet }: any) => {
  const [issuer, setIssuer] = useState<string>("")
  const [batchDenom, setBatchDenom] = useState<string>("")

  useEffect(() => {
    const msg = {
      issuer: wallet ? wallet.bech32Address : issuer,
      batchDenom: batchDenom,
    } as Msg

    const msgAny = {
      typeUrl: "/regen.ecocredit.v1.MsgSealBatch",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [issuer, batchDenom, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-seal-batch-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputString
        id="msg-seal-batch-batch-denom"
        label="batch denom"
        placeholder="C01-001-20200101-20210101-001"
        string={batchDenom}
        setString={setBatchDenom}
      />
    </>
  )
}

export default MsgSealBatch
