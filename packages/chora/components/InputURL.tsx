import * as React from "react"

const defaultId = "url"
const defaultLabel = "url"
const defaultPlaceholder = "https://server.chora.io/data/"

const InputURL = ({ id, label, placeholder, url, setUrl }: any) => {
  let noLabel = false
  if (label === "") noLabel = true

  return (
    <label htmlFor={id ? id : defaultId}>
      {!noLabel && (label ? label : defaultLabel)}
      <input
        id={id ? id : defaultId}
        value={url}
        placeholder={placeholder || defaultPlaceholder}
        onChange={event => setUrl(event.target.value)}
      />
    </label>
  )
}

export default InputURL
