import { MsgUpdateClassIssuers as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import InputAddress from '../InputAddress'
import InputIssuers from './InputIssuers'
import InputString from '../InputString'

const MsgUpdateClassIssuers = ({
  network,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [admin, setAdmin] = useState<string>('')
  const [classId, setClassId] = useState<string>('')
  const [addIssuers, setAddIssuers] = useState<any[]>([])
  const [removeIssuers, setRemoveIssuers] = useState<any[]>([])

  useEffect(() => {
    const msg = {
      admin: wallet ? wallet.bech32Address : admin,
      classId: classId,
      addIssuers: addIssuers.map((issuer: any) => issuer.address),
      removeIssuers: removeIssuers.map((issuer: any) => issuer.address),
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
      <p style={{ marginBottom: '1.5em' }}>{'add issuers'}</p>
      <InputIssuers
        id="msg-update-class-issuers-add-issuers"
        label="add issuers"
        issuers={addIssuers}
        setIssuers={setAddIssuers}
      />
      <p style={{ marginBottom: '1.5em' }}>{'remove issuers'}</p>
      <InputIssuers
        id="msg-update-class-issuers-remove-issuers"
        label="remove issuers"
        issuers={removeIssuers}
        setIssuers={setRemoveIssuers}
      />
    </>
  )
}

export default MsgUpdateClassIssuers
