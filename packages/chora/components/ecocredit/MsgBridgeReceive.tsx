import * as React from 'react'
import { useEffect, useState } from 'react'

import { MsgBridgeReceive as Msg } from '../../api/regen/ecocredit/v1/tx'

import InputAddress from '../InputAddress'
import InputIRI from '../InputIRI'
import InputString from '../InputString'
import InputTimestamp from '../InputTimestamp'

const MsgBridgeReceive = ({ network, setMessage, useWallet, wallet }: any) => {
  const [issuer, setIssuer] = useState<string>('')
  const [classId, setClassId] = useState<string>('')
  const [projectReferenceId, setProjectReferenceId] = useState<string>('')
  const [projectJurisdiction, setProjectJurisdiction] = useState<string>('')
  const [projectMetadata, setProjectMetadata] = useState<string>('')
  const [batchRecipient, setBatchRecipient] = useState<string>('')
  const [batchAmount, setBatchAmount] = useState<string>('')
  const [batchStartDate, setBatchStartDate] = useState<string>('')
  const [batchEndDate, setBatchEndDate] = useState<string>('')
  const [batchMetadata, setBatchMetadata] = useState<string>('')
  const [originTxId, setOriginTxId] = useState<string>('')
  const [originTxSource, setOriginTxSource] = useState<string>('')
  const [originTxContract, setOriginTxContract] = useState<string>('')
  const [originTxNote, setOriginTxNote] = useState<string>('')

  useEffect(() => {
    const msg = {
      issuer: wallet ? wallet.bech32Address : issuer,
      classId: classId,
      project: {
        referenceId: projectReferenceId,
        jurisdiction: projectJurisdiction,
        metadata: projectMetadata,
      },
      batch: {
        recipient: batchRecipient,
        amount: batchAmount,
        startDate: new Date(batchStartDate),
        endDate: new Date(batchEndDate),
        metadata: batchMetadata,
      },
      originTx: {
        id: originTxId,
        source: originTxSource,
        contract: originTxContract,
        note: originTxNote,
      },
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgBridgeReceive',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [
    issuer,
    classId,
    projectReferenceId,
    projectJurisdiction,
    projectMetadata,
    batchRecipient,
    batchAmount,
    batchStartDate,
    batchEndDate,
    batchMetadata,
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
          id="msg-bridge-receive-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputString
        id="msg-bridge-receive-class-id"
        label="class id"
        placeholder="C01"
        string={classId}
        setString={setClassId}
      />
      <InputString
        id="msg-bridge-receive-project-reference-id"
        label="project reference id"
        placeholder="VCS-001"
        string={projectReferenceId}
        setString={setProjectReferenceId}
      />
      <InputString
        id="msg-bridge-receive-project-jurisdiction"
        label="project jurisdiction"
        placeholder="US-WA"
        string={projectJurisdiction}
        setString={setProjectJurisdiction}
      />
      <InputIRI
        id="msg-bridge-receive-project-metadata"
        label="project metadata"
        network={network}
        iri={projectMetadata}
        setIri={setProjectMetadata}
      />
      <InputAddress
        id="msg-bridge-receive-batch-recipient"
        label="batch recipient"
        network={network}
        address={batchRecipient}
        setAddress={setBatchRecipient}
      />
      <InputString
        id="msg-bridge-receive-batch-amount"
        label="batch amount"
        placeholder="1.25"
        string={batchAmount}
        setString={setBatchAmount}
      />
      <InputTimestamp
        id="msg-bridge-receive-batch-start-date"
        label="batch start date"
        timestamp={batchStartDate}
        setTimestamp={setBatchStartDate}
      />
      <InputTimestamp
        id="msg-bridge-receive-batch-end-date"
        label="batch end date"
        timestamp={batchEndDate}
        setTimestamp={setBatchEndDate}
      />
      <InputIRI
        id="msg-bridge-receive-batch-metadata"
        label="batch metadata"
        network={network}
        iri={batchMetadata}
        setIri={setBatchMetadata}
      />
      <InputString
        id="msg-bridge-receive-origin-tx-id"
        label="origin tx id"
        placeholder="0x0"
        string={originTxId}
        setString={setOriginTxId}
      />
      <InputString
        id="msg-bridge-receive-origin-tx-source"
        label="origin tx source"
        placeholder="polygon"
        string={originTxSource}
        setString={setOriginTxSource}
      />
      <InputString
        id="msg-bridge-receive-origin-tx-contract"
        label="origin tx contract"
        placeholder="0x0"
        string={originTxContract}
        setString={setOriginTxContract}
      />
      <InputString
        id="msg-bridge-receive-origin-tx-note"
        label="origin tx note"
        placeholder="bridge service operator"
        string={originTxNote}
        setString={setOriginTxNote}
      />
    </>
  )
}

export default MsgBridgeReceive
