import * as React from 'react'

const SelectContext = ({ id, label, context, contexts, setContext }: any) => (
  <label htmlFor={id ? id : 'context'}>
    {label ? label : 'schema context'}
    <select id={id ? id : 'context'} value={context} onChange={setContext}>
      <option value="">{'--- select ---'}</option>
      {contexts.map((s: any) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  </label>
)

export default SelectContext
