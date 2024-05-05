import { MsgMintBatchCredits as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import { OriginTx } from 'cosmos/api/regen/ecocredit/v1/types'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputIssuances } from '.'
import { InputAddress, InputString } from '..'

const MsgMintBatchCredits = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [issuer, setIssuer] = useState<string>('')
  const [batchDenom, setBatchDenom] = useState<string>('')
  const [issuance, setIssuance] = useState<any[]>([])
  const [originTxId, setOriginTxId] = useState<string>('')
  const [originTxSource, setOriginTxSource] = useState<string>('')
  const [originTxContract, setOriginTxContract] = useState<string>('')
  const [originTxNote, setOriginTxNote] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgMintBatchCredits',
      issuer: wallet ? wallet.bech32Address : issuer,
      batchDenom: batchDenom,
      issuance: issuance,
      originTx: OriginTx.fromJSON({
        id: originTxId,
        source: originTxSource,
        contract: originTxContract,
        note: originTxNote,
      }),
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgMintBatchCredits',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [
    issuer,
    batchDenom,
    issuance,
    originTxId,
    originTxSource,
    originTxContract,
    originTxNote,
    wallet,
  ])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-mint-batch-credits-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputString
        id="msg-mint-batch-credits-batch-denom"
        label="batch denom"
        placeholder="C01"
        string={batchDenom}
        setString={setBatchDenom}
      />
      <InputIssuances
        id="msg-create-batch-issuance"
        label="issuance"
        issuances={issuance}
        setIssuances={setIssuance}
      />
      <InputString
        id="msg-mint-batch-credits-origin-tx-id"
        label="origin tx id"
        placeholder="0x0"
        string={originTxId}
        setString={setOriginTxId}
      />
      <InputString
        id="msg-mint-batch-credits-origin-tx-source"
        label="origin tx source"
        placeholder="polygon"
        string={originTxSource}
        setString={setOriginTxSource}
      />
      <InputString
        id="msg-mint-batch-credits-origin-tx-contract"
        label="origin tx contract"
        placeholder="0x0"
        string={originTxContract}
        setString={setOriginTxContract}
      />
      <InputString
        id="msg-mint-batch-credits-origin-tx-note"
        label="origin tx note"
        placeholder="bridge service operator"
        string={originTxNote}
        setString={setOriginTxNote}
      />
    </>
  )
}

export default MsgMintBatchCredits
