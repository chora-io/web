import * as React from 'react'
import { useEffect, useState } from 'react'

import { MsgUpdateClassIssuers as Msg } from '../../api/regen/ecocredit/v1/tx'

import InputAddress from '../InputAddress'
import InputString from '../InputString'

const MsgUpdateClassIssuers = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [classId, setClassId] = useState<string>('')
  const [addIssuers, setAddIssuers] = useState<string>('')
  const [removeIssuers, setRemoveIssuers] = useState<string>('')

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      classId: classId,
      addIssuers: [], // TODO
      removeIssuers: [], // TODO
    } as unknown as Msg

    const msgAny = {
      typeUrl: '/regen.ecocredit.v1.MsgUpdateClassIssuers',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [admin, classId, addIssuers, removeIssuers, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-update-class-issuers-admin"
          label="admin"
          long={true}
          network={network}
          address={admin}
          setAddress={setAdmin}
        />
      )}
      <InputString
        id="msg-update-class-issuers-class-id"
        label="class id"
        placeholder="C01"
        iri={classId}
        setIri={setClassId}
      />
      <InputString
        id="msg-update-class-issuers-add-issuers"
        label="add issuers"
        placeholder="[ not implemented ]"
        string={addIssuers}
        setString={setAddIssuers}
      />
      <InputString
        id="msg-update-class-issuers-remove-issuers"
        label="remove issuers"
        placeholder="[ not implemented ]"
        string={removeIssuers}
        setString={setRemoveIssuers}
      />
    </>
  )
}

export default MsgUpdateClassIssuers
