import * as React from "react"
import { useEffect, useState } from "react"

import { MsgExec as Msg } from "../../api/cosmos/authz/v1beta1/tx"

import InputAddress from "../InputAddress"
import SelectMessage from "../SelectMessage"

const MsgExec = ({ network, setMessage, useWallet, wallet }: any) => {

  // message inputs
  const [grantee, setGrantee] = useState<string>("")
  const [execMsg, setExecMsg] = useState<any>(undefined)

  useEffect(() => {

    const msg = {
      grantee: wallet ? wallet.bech32Address : grantee,
      msgs: execMsg ? [execMsg] : [],
    } as Msg

    const msgAny = {
      typeUrl: "/cosmos.authz.v1beta1.MsgExec",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [grantee, execMsg, wallet])

  return (
    <>
      {!useWallet &&
        <InputAddress
          id="msg-exec-grantee"
          label="grantee"
          long={true}
          network={network}
          address={grantee}
          setAddress={setGrantee}
        />
      }
      <SelectMessage
        id="msg-exec-message"
        label="message"
        network={network}
        setMessage={setExecMsg}
      />
    </>
  )
}

export default MsgExec
