import * as React from "react"
import { useEffect, useState } from "react"

import { MsgAttest as Msg } from "../../api/regen/data/v1/tx"

import InputAddress from "../InputAddress"
import InputContentHashJSON from "../InputContentHashJSON"

const MsgAttestJSON = ({ network, setMessage, useWallet, wallet }: any) => {

  const [attestor, setSender] = useState<string>("")
  const [contentHashJson, setContentHashJson] = useState<string>("")

  useEffect(() => {

    let contentHash: any

    try {
      contentHash = JSON.parse(contentHashJson)
    } catch (err) {
      contentHash = undefined
    }

    const msg = {
      attestor: wallet ? wallet.bech32Address : attestor,
      contentHashes: contentHash ? [contentHash] : [],
    } as Msg

    const msgAny = {
      typeUrl: "/regen.data.v1.MsgAttest",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [attestor, contentHashJson, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-attest-attestor"
          label="attestor"
          long={true}
          network={network}
          address={attestor}
          setAddress={setSender}
        />
      )}
      <InputContentHashJSON
        id="msg-attest-content-hash"
        label="content hash"
        json={contentHashJson}
        setJson={setContentHashJson}
      />
    </>
  )
}

export default MsgAttestJSON
