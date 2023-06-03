import * as React from "react"
import { useEffect, useState } from "react"

import { MsgGrantAllowance as Msg } from "../../api/cosmos/feegrant/v1beta1/tx"

import InputAddress from "../InputAddress"
import InputAllowance from "./InputAllowance"

const MsgGrantAllowance = ({ network, setMessage, useWallet, wallet }: any) => {

  // message inputs
  const [granter, setGranter] = useState<string>("")
  const [grantee, setGrantee] = useState<string>("")
  const [allowance, setAllowance] = useState<any>(undefined)

  useEffect(() => {

    const msg = {
      granter: wallet ? wallet.bech32Address : granter,
      grantee: grantee,
      allowance: allowance,
    } as Msg

    const msgAny = {
      typeUrl: "/cosmos.feegrant.v1beta1.MsgGrantAllowance",
      value: Msg.encode(msg).finish(),
    }

    setMessage(msgAny)

  }, [granter, grantee, allowance, wallet])

  return (
    <>
      {!useWallet &&
        <InputAddress
          id="msg-grant-allowance-granter"
          label="granter"
          long={true}
          network={network}
          address={granter}
          setAddress={setGranter}
        />
      }
      <InputAddress
        id="msg-grant-allowance-grantee"
        label="grantee"
        network={network}
        address={grantee}
        setAddress={setGrantee}
      />
      <InputAllowance
        id="msg-grant-allowance-allowance"
        label="allowance"
        network={network}
        setAllowance={setAllowance}
      />
    </>
  )
}

export default MsgGrantAllowance
