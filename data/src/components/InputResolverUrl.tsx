import * as React from "react"

const placeholder = "https://server.chora.io"

const InputResolverUrl = ({ id, label, url, setUrl }: any) => (
  <label htmlFor={id ? id : "resolver-url"}>
    {label ? label : "resolver url"}
    <input
      id={id ? id : "resolver-url"}
      value={url}
      placeholder={placeholder}
      onChange={event => setUrl(event.target.value)}
    />
  </label>
)

export default InputResolverUrl
