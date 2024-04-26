import { MsgCreateBatch as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputIssuances } from '.'
import { InputAddress, InputIRI, InputString, InputTimestamp } from '..'

const MsgCreateBatch = ({ network, setMessage, useWallet, wallet }: any) => {
  const [issuer, setIssuer] = useState<string>('')
  const [projectId, setProjectId] = useState<string>('')
  const [issuance, setIssuance] = useState<any[]>([])
  const [metadata, setMetadata] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  useEffect(() => {
    const msg = {
      issuer: wallet ? wallet.bech32Address : issuer,
      projectId: projectId,
      issuance: issuance,
      metadata: metadata,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgCreateBatch',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [issuer, projectId, metadata, issuance, startDate, endDate, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-create-batch-issuer"
          label="issuer"
          long={true}
          network={network}
          address={issuer}
          setAddress={setIssuer}
        />
      )}
      <InputString
        id="msg-create-batch-project-id"
        label="project id"
        placeholder="C01-001"
        string={projectId}
        setString={setProjectId}
      />
      <InputIRI
        id="msg-create-batch-metadata"
        label="metadata"
        network={network}
        iri={metadata}
        setIri={setMetadata}
      />
      <InputIssuances
        id="msg-create-batch-issuance"
        label="issuance"
        issuances={issuance}
        setIssuances={setIssuance}
      />
      <InputTimestamp
        id="msg-create-batch-start-date"
        label="start date"
        timestamp={startDate}
        setTimestamp={setStartDate}
      />
      <InputTimestamp
        id="msg-create-batch-end-date"
        label="end date"
        timestamp={endDate}
        setTimestamp={setEndDate}
      />
    </>
  )
}

export default MsgCreateBatch
