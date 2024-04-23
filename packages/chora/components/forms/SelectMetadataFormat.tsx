import * as React from 'react'

const defaultId = 'metadata-format'
const defaultLabel = 'metadata format'

const SelectMetadataFormat = ({
  id,
  label,
  network,
  metadataFormat,
  setMetadataFormat,
}: any) => (
  <label htmlFor={id ? id : defaultId}>
    {label ? label : defaultLabel}
    <select
      id={id ? id : defaultId}
      value={metadataFormat}
      onChange={(event) => setMetadataFormat(event.target.value)}
    >
      <option value={'json'}>{'raw json'}</option>
      <option value={'iri'}>
        {network ? network.split('-')[0] + ' iri' : 'network iri'}
      </option>
    </select>
  </label>
)

export default SelectMetadataFormat
