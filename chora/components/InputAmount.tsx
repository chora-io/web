import * as React from "react"

const defaultId = "amount"
const defaultLabel = "amount"

const choraAmount = "20uchora"
const regenAmount = "20uregen"

const InputAmount = ({ id, label, placeholder, network, amount, setAmount }: any) => {

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
        value={amount}
        placeholder={placeholder || defaultPlaceholder}
        onChange={event => setAmount(event.target.value)}
      />
    </label>
  )
}

export default InputAmount
