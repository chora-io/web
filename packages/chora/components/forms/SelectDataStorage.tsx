import * as React from 'react'

const defaultId = 'data-storage'
const defaultLabel = 'data storage'

const SelectDataStorage = ({
  id,
  label,
  network,
  dataStorage,
  setDataStorage,
}: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={dataStorage}
      onChange={(event) => setDataStorage(event.target.value)}
    >
      <option value={'json'}>
        {
          'none (convert metadata to json and use json string for the metadata field)'
        }
      </option>
      <option value={'server'}>
        {`server (post metadata to chora server and use ${network ? network.split('-')[0] + ' iri' : 'network iri'} for the metadata field)`}
      </option>
    </select>
  </label>
)

export default SelectDataStorage
