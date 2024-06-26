import { MsgSetClassCreatorAllowlist as Msg } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, SelectBoolean } from '..'

const MsgSetClassCreatorAllowlist = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [authority, setAuthority] = useState<string>('')
  const [enabled, setEnabled] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.ecocredit.v1.MsgSetClassCreatorAllowlist',
      authority: wallet ? wallet.bech32Address : authority,
      enabled: enabled === 'true',
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.ecocredit.v1.MsgSetClassCreatorAllowlist',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [authority, enabled, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-set-class-creator-authority"
          label="authority"
          long={true}
          network={network}
          address={authority}
          setAddress={setAuthority}
        />
      )}
      <SelectBoolean
        id="msg-set-class-creator-enabled"
        label="enabled"
        boolean={enabled}
        setBoolean={setEnabled}
      />
    </>
  )
}

export default MsgSetClassCreatorAllowlist
