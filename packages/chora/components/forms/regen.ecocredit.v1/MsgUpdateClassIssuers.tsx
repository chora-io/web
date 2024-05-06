import { MsgUpdateClassIssuers as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputString } from '..'
import { InputIssuers } from '.'

const MsgUpdateClassIssuers = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [classId, setClassId] = useState<string>('')
  const [addIssuers, setAddIssuers] = useState<any[]>([])
  const [removeIssuers, setRemoveIssuers] = useState<any[]>([])

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgUpdateClassIssuers',
      admin: wallet ? wallet.bech32Address : admin,
      classId: classId,
      addIssuers: addIssuers.map((issuer: any) => issuer.address),
      removeIssuers: removeIssuers.map((issuer: any) => issuer.address),
    }

    const msgAny = {
      index: message ? message.index : undefined,
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
        string={classId}
        setString={setClassId}
      />
      <InputIssuers
        id="msg-update-class-issuers-add-issuers"
        label="add issuers"
        lockLabel={true}
        issuers={addIssuers}
        setIssuers={setAddIssuers}
      />
      <InputIssuers
        id="msg-update-class-issuers-remove-issuers"
        label="remove issuers"
        lockLabel={true}
        issuers={removeIssuers}
        setIssuers={setRemoveIssuers}
      />
    </>
  )
}

export default MsgUpdateClassIssuers
