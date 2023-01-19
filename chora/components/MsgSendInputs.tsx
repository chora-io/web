import * as React from "react"

import InputAddress from "./InputAddress"
import InputAmount from "./InputAmount"

const MsgSendInputs = ({ network, message, setMessage }: any) => {

  // "typeUrl": "/cosmos.bank.v1beta1.MsgSend",

  // {
  //   typeUrl: message.typeUrl,
  //   value: MsgSend.encode(message.value).finish(),
  // }

  return (
    <>
      <InputAddress
        id="msg-send-from-address"
        label="from address"
        long={true}
        network={network}
      />
      <InputAddress
        id="msg-send-to-address"
        label="to address"
        long={true}
        network={network}
      />
      <InputAmount
        id="msg-send-amount"
        label="amount"
        long={true}
        network={network}
      />
    </>
  )
}

export default MsgSendInputs
