import { MsgDefineResolver as Msg } from 'cosmos/api/regen/data/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputURL } from '..'

const MsgDefineResolver = ({
  network,
  message,
  setMessage,
  useWallet,
  wallet,
}: any) => {
  const [manager, setManager] = useState<string>('')
  const [resolverUrl, setResolverUrl] = useState<string>('')

  useEffect(() => {
    const msg: Msg = {
      $type: 'regen.data.v1.MsgDefineResolver',
      manager: wallet ? wallet.bech32Address : manager,
      resolverUrl: resolverUrl,
    }

    const msgAny = {
      index: message ? message.index : undefined,
      typeUrl: '/regen.data.v1.MsgDefineResolver',
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [manager, resolverUrl, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-define-resolver-manager"
          label="manager"
          long={true}
          network={network}
          address={manager}
          setAddress={setManager}
        />
      )}
      <InputURL
        id="msg-define-resolver-url"
        label="resolver url"
        url={resolverUrl}
        setUrl={setResolverUrl}
      />
    </>
  )
}

export default MsgDefineResolver
