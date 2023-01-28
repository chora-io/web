import * as React from "react"
import { useEffect, useState } from "react"

import { MsgRevoke as Msg } from "../../api/cosmos/authz/v1beta1/tx"

import InputAddress from "../InputAddress"
import SelectMessage from "../SelectMessage"

const MsgRevoke = ({ network, setMessage, useWallet, wallet }: any) => {

  // grant inputs
  const [granter, setGranter] = useState<string>("")
  const [grantee, setGrantee] = useState<string>("")
  const [revokeMessage, setRevokeMessage] = useState<any>(undefined)

  useEffect(() => {

    const msg = {
      $type: "cosmos.authz.v1beta1.MsgRevoke",
      granter: wallet ? wallet.bech32Address : granter,
      grantee: grantee,
      msgTypeUrl: revokeMessage ? revokeMessage.typeUrl : "",
    } as Msg

    const msgAny = {
      typeUrl: "/cosmos.authz.v1beta1.MsgRevoke",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [granter, grantee, revokeMessage, wallet])

  return (
    <>
      {!useWallet &&
        <InputAddress
          id="msg-revoke-granter"
          label="granter"
          long={true}
          network={network}
          address={granter}
          setAddress={setGranter}
        />
      }
      <InputAddress
        id="msg-revoke-grantee"
        label="grantee"
        network={network}
        address={grantee}
        setAddress={setGrantee}
      />
      <SelectMessage
        id="msg-revoke-message"
        label="message"
        typeOnly={true}
        network={network}
        message={revokeMessage}
        setMessage={setRevokeMessage}
      />
    </>
  )
}

export default MsgRevoke
