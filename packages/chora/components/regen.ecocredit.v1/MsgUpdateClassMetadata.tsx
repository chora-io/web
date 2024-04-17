import { MsgUpdateClassMetadata as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputIRI, InputString } from '..'

const MsgUpdateClassMetadata = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [classId, setClassId] = useState<string>('')
  const [newMetadata, setNewMetadata] = useState<string>('')

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      classId: classId,
      newMetadata: newMetadata,
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgUpdateClassMetadata',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, classId, newMetadata, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-update-class-metadata-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputString
        id="msg-update-class-metadata-class-id"
        label="class id"
        placeholder="C01"
        string={classId}
        setString={setClassId}
      />
      <InputIRI
        id="msg-update-class-metadata-new-metadata"
        label="new metadata"
        network={network}
        iri={newMetadata}
        setIri={setNewMetadata}
      />
    </>
  )
}

export default MsgUpdateClassMetadata
