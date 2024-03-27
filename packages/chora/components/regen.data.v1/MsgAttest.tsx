import { MsgAttest as Msg } from 'cosmos/api/regen/data/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import InputAddress from '../InputAddress'
import InputContentHash from './InputContentHash'

const MsgAttest = ({ network, setMessage, useWallet, wallet }: any) => {
  const [attestor, setAttestor] = useState<string>('')
  const [contentHash, setContentHash] = useState<any>(undefined)

  useEffect(() => {
    const msg = {
      attestor: wallet ? wallet.bech32Address : attestor,
      contentHashes: contentHash ? [contentHash] : [],
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.data.v1.MsgAttest',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [attestor, contentHash, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-attest-attestor"
          label="attestor"
          long={true}
          network={network}
          address={attestor}
          setAddress={setAttestor}
        />
      )}
      <InputContentHash
        id="msg-attest-content-hash"
        label="content hash"
        onlyGraph={true}
        contentHash={contentHash}
        setContentHash={setContentHash}
      />
    </>
  )
}

export default MsgAttest
