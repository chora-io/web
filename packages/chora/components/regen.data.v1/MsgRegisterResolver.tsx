import { MsgRegisterResolver as Msg } from 'cosmos/api/regen/data/v1/tx'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import InputAddress from '../InputAddress'
import InputContentHash from './InputContentHash'
import InputNumber from '../InputNumber'

const MsgRegisterResolver = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [manager, setManager] = useState<string>('')
  const [resolverId, setResolverId] = useState<string>('')
  const [contentHash, setContentHash] = useState<any>(undefined)

  useEffect(() => {
    const msg = {
      manager: wallet ? wallet.bech32Address : manager,
      resolverId: Long.fromString(resolverId || '0'),
      contentHashes: contentHash ? [contentHash] : [],
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.data.v1.MsgRegisterResolver',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [manager, resolverId, contentHash, wallet])

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
      <InputContentHash
        id="msg-register-resolver-content-hash"
        label="content hash"
        contentHash={contentHash}
        setContentHash={setContentHash}
      />
    </>
  )
}

export default MsgRegisterResolver
