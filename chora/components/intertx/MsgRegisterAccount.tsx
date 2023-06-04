import * as React from "react"
import { useEffect, useState } from "react"

import { MsgRegisterAccount as Msg } from "../../api/regen/intertx/v1/tx"

import InputAddress from "../InputAddress"
import InputString from "../InputString"

const MsgRegisterAccount = ({ network, setMessage, useWallet, wallet }: any) => {
  const [owner, setOwner] = useState<string>("")
  const [connectionId, setConnectionId] = useState<string>("")
  const [version, setVersion] = useState<string>("")

  useEffect(() => {
    const msg = {
      owner: wallet ? wallet.bech32Address : owner,
      connectionId: connectionId,
      version: version,
    } as Msg

    const msgAny = {
      typeUrl: "/regen.intertx.v1.MsgRegisterAccount",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [owner, connectionId, version, wallet])

  return (
    <>
      {!useWallet && (
        <InputAddress
          id="msg-register-account-owner"
          label="owner"
          long={true}
          network={network}
          address={owner}
          setAddress={setOwner}
        />
      )}
      <InputString
        id="msg-register-account-connection-id"
        label="connection id"
        placeholder="connection-0"
        string={connectionId}
        setString={setConnectionId}
      />
      <InputString
        id="msg-register-account-version"
        label="version"
        placeholder='{"version":"ics27-1","tx_type":"sdk_multi_msg","encoding":"proto3","host_connection_id":"connection-0","controller_connection_id":"connection-0","address":"regen14zs2x38lmkw4eqvl3lpml5l8crzaxn6mpvh79z"}'
        string={version}
        setString={setVersion}
      />
    </>
  )
}

export default MsgRegisterAccount
