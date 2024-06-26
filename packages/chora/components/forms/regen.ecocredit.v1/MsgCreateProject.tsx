import { MsgCreateProject as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputString } from '..'

const MsgCreateProject = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [classId, setClassId] = useState<string>('')
  const [metadata, setMetadata] = useState<string>('')
  const [jurisdiction, setJurisdiction] = useState<string>('')
  const [referenceId, setReferenceId] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgCreateProject',
      admin: wallet ? wallet.bech32Address : admin,
      classId: classId,
      metadata: metadata,
      jurisdiction: jurisdiction,
      referenceId: referenceId,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgCreateProject',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, classId, metadata, jurisdiction, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-create-project-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputString
        id="msg-create-project-class-id"
        label="class id"
        placeholder="C01"
        string={classId}
        setString={setClassId}
      />
      <InputIRI
        id="msg-create-project-metadata"
        label="metadata"
        network={network}
        iri={metadata}
        setIri={setMetadata}
      />
      <InputString
        id="msg-create-project-jurisdiction"
        label="jurisdiction"
        placeholder="US-WA"
        string={jurisdiction}
        setString={setJurisdiction}
      />
      <InputString
        id="msg-create-project-reference-id"
        label="reference id"
        placeholder="VCS-001"
        string={referenceId}
        setString={setReferenceId}
      />
    </>
  )
}

export default MsgCreateProject
