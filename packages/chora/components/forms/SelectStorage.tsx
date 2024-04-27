import * as React from 'react'

const defaultId = 'metadata-storage'
const defaultLabel = 'metadata storage'

const SelectStorage = ({
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
          'none (ignore json-ld context and use raw json string for the metadata field)'
        }
      </option>
      <option value={'server'}>
        {`server (store json-ld on chora server and use ${network ? network.split('-')[0] + ' iri' : 'network iri'} for the metadata field)`}
      </option>
    </select>
  </label>
)

export default SelectStorage
