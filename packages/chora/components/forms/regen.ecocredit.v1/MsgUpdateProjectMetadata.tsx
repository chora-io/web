import { MsgUpdateProjectMetadata as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputString } from '..'

const MsgUpdateProjectMetadata = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [projectId, setProjectId] = useState<string>('')
  const [newMetadata, setNewMetadata] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgUpdateProjectMetadata',
      admin: wallet ? wallet.bech32Address : admin,
      projectId: projectId,
      newMetadata: newMetadata,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgUpdateProjectMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, projectId, newMetadata, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-update-project-metadata-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputString
        id="msg-update-project-metadata-project-id"
        label="project id"
        placeholder="C01"
        string={projectId}
        setString={setProjectId}
      />
      <InputIRI
        id="msg-update-project-metadata-new-metadata"
        label="new metadata"
        network={network}
        iri={newMetadata}
        setIri={setNewMetadata}
      />
    </>
  )
}

export default MsgUpdateProjectMetadata
