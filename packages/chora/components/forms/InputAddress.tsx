import * as React from 'react'
import { useEffect, useState } from 'react'

const defaultId = 'address'
const defaultLabel = 'address'

const choraAddress = 'chora1jx34255cgvxpthkg572ma6rhq6crwl6xh7g0md'
const regenAddress = 'regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx'
const choraAddressLong =
  'chora1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsdnjkmu'
const regenAddressLong =
  'regen1afk9zr2hn2jsac63h4hm60vl9z3e5u69gndzf7c99cqge3vzwjzsdnjkmu'

const InputAddress = ({
  id,
  label,
  placeholder,
  long,
  network,
  address,
  initAddress,
  setAddress,
}: any) => {
  let noLabel = false
  if (label === '') noLabel = true

  let defaultPlaceholder: string
  if (!network || network.includes('chora')) {
    if (long) {
      defaultPlaceholder = choraAddressLong
    } else {
      defaultPlaceholder = choraAddress
    }
  } else {
    if (long) {
      defaultPlaceholder = regenAddressLong
    } else {
      defaultPlaceholder = regenAddress
    }
  }

  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    if (!initialized && !address && initAddress) {
      setAddress(initAddress)
      setInitialized(true)
    }
  }, [initialized, initAddress, setAddress, setInitialized])

  return (
    <label htmlFor={id ? id : defaultId}>
      {!noLabel && (label ? label : defaultLabel)}
      <input
        id={id ? id : defaultId}
        value={address}
        placeholder={placeholder || defaultPlaceholder}
        onChange={(event) => setAddress(event.target.value)}
      />
    </label>
  )
}

export default InputAddress
