import * as React from "react"

const defaultId = "account"
const defaultLabel = "account"

const SelectAccount = ({ id, label, options, address, setAddress }: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={address}
      onChange={event => setAddress(event.target.value)}
    >
      <option value="">
        {"--- select ---"}
      </option>
      {options && options.map((o: any) => (
        <option key={o["address"]} value={o["address"]}>
          {o["name"] || o["address"]}
        </option>
      ))}
    </select>
  </label>
)

export default SelectAccount
