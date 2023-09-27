import * as React from 'react'

const defaultId = 'number'
const defaultLabel = 'number'
const defaultPlaceholder = '1'

const InputNumber = ({ id, label, placeholder, number, setNumber }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <input
      id={id ? id : defaultId}
      value={number}
      placeholder={placeholder || defaultPlaceholder}
      onChange={(event) => setNumber(event.target.value)}
    />
  </label>
)

export default InputNumber
