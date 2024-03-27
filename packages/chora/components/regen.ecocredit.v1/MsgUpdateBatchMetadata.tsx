import { MsgUpdateBatchMetadata as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import InputAddress from '../InputAddress'
import InputIRI from '../InputIRI'
import InputString from '../InputString'

const MsgUpdateBatchMetadata = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [issuer, setIssuer] = useState<string>('')
  const [batchDenom, setBatchDenom] = useState<string>('')
  const [newMetadata, setNewMetadata] = useState<string>('')

  useEffect(() => {
    const msg = {
      issuer: wallet ? wallet.bech32Address : issuer,
      batchDenom: batchDenom,
      newMetadata: newMetadata,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgUpdateBatchMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [issuer, batchDenom, newMetadata, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-update-batch-metadata-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputString
        id="msg-update-batch-metadata-batch-denom"
        label="batch denom"
        placeholder="C01-001-20200101-20210101-001"
        string={batchDenom}
        setString={setBatchDenom}
      />
      <InputIRI
        id="msg-update-batch-metadata-new-metadata"
        label="new metadata"
        network={network}
        iri={newMetadata}
        setIri={setNewMetadata}
      />
    </>
  )
}

export default MsgUpdateBatchMetadata
