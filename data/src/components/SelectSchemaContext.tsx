import * as React from "react"

const SelectSchemaContext = ({ id, label, context, contexts, setContext }: any) => (
  <label htmlFor={id ? id : "context"}>
    {label ? label : "schema context"}
    <select
      id={id ? id : "context"}
      value={context}
      onChange={setContext}
    >
      <option value="">
        {"--- select ---"}
      </option>
      {contexts.map(s => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  </label>
)

export default SelectSchemaContext
