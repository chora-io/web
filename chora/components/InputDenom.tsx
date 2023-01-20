import * as React from "react"

const defaultId = "denom"
const defaultLabel = "denom"

const choraAmount = "uchora"
const regenAmount = "uregen"

const InputDenom = ({ id, label, placeholder, network, denom, setDenom }: any) => {

  let defaultPlaceholder: string
  if (network === undefined || network.includes("chora")) {
    defaultPlaceholder = choraAmount
  } else {
    defaultPlaceholder = regenAmount
  }

  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <input
        id={id ? id : defaultId}
        value={denom}
        placeholder={placeholder || defaultPlaceholder}
        onChange={event => setDenom(event.target.value)}
      />
    </label>
  )
}

export default InputDenom
