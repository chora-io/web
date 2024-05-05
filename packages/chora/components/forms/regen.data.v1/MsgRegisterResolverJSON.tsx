import { MsgRegisterResolver as Msg } from 'cosmos/api/regen/data/v1/tx'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputNumber } from '..'
import { InputContentHashJSON } from '.'

const MsgRegisterResolverJSON = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [manager, setManager] = useState<string>('')
  const [resolverId, setResolverId] = useState<string>('')
  const [contentHashJson, setContentHashJson] = useState<any>(undefined)

  useEffect(() => {
    let contentHash: any

    try {
      contentHash = JSON.parse(contentHashJson)
    } catch (err) {
      contentHash = undefined
    }

    const msg: Msg = {
      $type: 'regen.data.v1.MsgRegisterResolver',
      manager: wallet ? wallet.bech32Address : manager,
      resolverId: Long.fromString(resolverId || '0'),
      contentHashes: contentHash ? [contentHash] : [],
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.data.v1.MsgRegisterResolver',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [manager, resolverId, contentHashJson, wallet])

  return (
    <>
      <InputNumber
        id="msg-register-resolver-id"
        label="resolver id"
        number={resolverId}
        setNumber={setResolverId}
      />
      {!useWallet && (
        <InputAddress
          id="msg-register-resolver-manager"
          label="manager"
          long={true}
          network={network}
          address={manager}
          setAddress={setManager}
        />
      )}
      <InputContentHashJSON
        id="msg-register-resolver-content-hash"
        label="content hash"
        json={contentHashJson}
        setJson={setContentHashJson}
      />
    </>
  )
}

export default MsgRegisterResolverJSON
