import * as React from 'react'
import { useEffect, useState } from 'react'

const defaultId = 'string'
const defaultLabel = 'string'
const defaultPlaceholder = ''

const InputString = ({
  id,
  label,
  placeholder,
  string,
  initString,
  setString,
  disabled,
}: any) => {
  let noLabel = false
  if (label === '') noLabel = true

  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized && !string && initString) {
      setString(initString)
      setInitialized(true)
    }
  }, [initialized, initString, setString, setInitialized])

  return (
    <label htmlFor={id ? id : defaultId}>
      {!noLabel && (label ? label : defaultLabel)}
      <input
        id={id ? id : defaultId}
        value={string}
        placeholder={placeholder || defaultPlaceholder}
        onChange={(event) => setString(event.target.value)}
        disabled={disabled}
      />
    </label>
  )
}

export default InputString
