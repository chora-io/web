import * as React from "react"

const defaultId = "string"
const defaultLabel = "string"
const defaultPlaceholder = ""

const InputString = ({ id, label, placeholder, string, setString }: any) => {
  let noLabel = false
  if (label === "") {
    noLabel = true
  }

  return (
    <label htmlFor={id ? id : defaultId}>
      {!noLabel && (label ? label : defaultLabel)}
      <input
        id={id ? id : defaultId}
        value={string}
        placeholder={placeholder || defaultPlaceholder}
        onChange={event => setString(event.target.value)}
      />
    </label>
  )
}

export default InputString
