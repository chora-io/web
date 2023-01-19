import * as React from "react"
import { useState } from "react"

import MsgSendInputs from "./MsgSendInputs"

const defaultId = "message"
const defaultLabel = "message"

// all available messages
const defaultOptions = [
  "cosmos.bank.v1beta1.MsgSend",
]

const SelectMessage = ({ id, label, options, network, message, setMessage }: any) => {

  const opts = options || defaultOptions

  const [selected, setSelected] = useState<string>("")

  return (
    <>
      <label htmlFor={id ? id : defaultId}>
        {label ? label : defaultLabel}
        <select
          id={id ? id : defaultId}
          value={selected}
          onChange={event => setSelected(event.target.value)}
        >
          <option value="">
            {"--- select ---"}
          </option>
          {opts.map((o: string) => (
            <option value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      {selected === "cosmos.bank.v1beta1.MsgSend" && (
        <MsgSendInputs
          network={network}
          message={message}
          setMessage={setMessage}
        />
      )}
    </>
  )
}

export default SelectMessage
