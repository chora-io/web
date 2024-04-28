import * as React from 'react'
import { useEffect, useState } from 'react'

const defaultId = 'number'
const defaultLabel = 'number'
const defaultPlaceholder = '1'

const InputNumber = ({
  id,
  label,
  disabled,
  placeholder,
  number,
  initNumber,
  setNumber,
}: any) => {
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized && !number && initNumber) {
      setNumber(initNumber)
      setInitialized(true)
    }
  }, [initialized, initNumber, setNumber, setInitialized])

  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <input
        id={id ? id : defaultId}
        value={number}
        disabled={disabled}
        placeholder={placeholder || defaultPlaceholder}
        onChange={(event) => setNumber(event.target.value)}
      />
    </label>
  )
}

export default InputNumber
