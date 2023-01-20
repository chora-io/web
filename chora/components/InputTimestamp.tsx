import * as React from "react"

const defaultId = "timestamp"
const defaultLabel = "timestamp"

const InputTimestamp = ({ id, label, timestamp, setTimestamp }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <input
      type="datetime-local"
      id={id ? id : defaultId}
      value={timestamp}
      onChange={event => setTimestamp(event.target.value)}
    />
  </label>
)

export default InputTimestamp
