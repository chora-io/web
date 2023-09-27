import * as React from 'react'

const defaultId = 'denom'
const defaultLabel = 'denom'

const choraDenom = 'uchora'
const regenDenom = 'uregen'

const InputDenom = ({
  id,
  label,
  placeholder,
  network,
  denom,
  setDenom,
}: any) => {
  let defaultPlaceholder: string
  if (network === undefined || network.includes('chora')) {
    defaultPlaceholder = choraDenom
  } else {
    defaultPlaceholder = regenDenom
  }

  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <input
        id={id ? id : defaultId}
        value={denom}
        placeholder={placeholder || defaultPlaceholder}
        onChange={(event) => setDenom(event.target.value)}
      />
    </label>
  )
}

export default InputDenom
