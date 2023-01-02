import * as React from "react"

const placeholder = "1"

const InputNumber = ({ id, label, number, setNumber }: any) => (
  <label htmlFor={id ? id : "number"}>
    {label ? label : "number"}
    <input
      id={id ? id : "number"}
      value={number}
      placeholder={placeholder}
      onChange={event => setNumber(event.target.value)}
    />
  </label>
)

export default InputNumber
