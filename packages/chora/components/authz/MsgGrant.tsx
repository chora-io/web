import * as React from "react"
import { useEffect, useState } from "react"

import { MsgGrant as Msg } from "../../api/cosmos/authz/v1beta1/tx"

import InputAddress from "../InputAddress"
import InputGrant from "./InputGrant"

const MsgGrant = ({ network, setMessage, useWallet, wallet }: any) => {
  const [granter, setGranter] = useState<string>("")
  const [grantee, setGrantee] = useState<string>("")
  const [grant, setGrant] = useState<any>(undefined)

  useEffect(() => {
    const msg = {
      granter: wallet ? wallet.bech32Address : granter,
      grantee: grantee,
      grant: grant,
    } as unknown as Msg

    const msgAny = {
      typeUrl: "/cosmos.authz.v1beta1.MsgGrant",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)
  }, [granter, grantee, grant, wallet])

  return (
    <>
      {!useWallet &&
        <InputAddress
          id="msg-grant-granter"
          label="granter"
          long={true}
          network={network}
          address={granter}
          setAddress={setGranter}
        />
      }
      <InputAddress
        id="msg-grant-grantee"
        label="grantee"
        network={network}
        address={grantee}
        setAddress={setGrantee}
      />
      <InputGrant
        id="msg-grant-grant"
        label="grant"
        network={network}
        setGrant={setGrant}
      />
    </>
  )
}

export default MsgGrant
