import * as React from 'react'

import {
  bionLocal,
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
} from 'cosmos/chains'

const defaultId = 'network'
const defaultLabel = 'network'

const SelectNetwork = ({ id, label, selected, network, setNetwork }: any) => {
  let local = false
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname == '0.0.0.0' ||
      window.location.hostname == '127.0.0.1' ||
      window.location.hostname == 'localhost')
  ) {
    local = true
  }

  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <select
        id={id ? id : defaultId}
        value={selected || network}
        onChange={(event) => setNetwork(event.target.value)}
      >
        {local && (
          <option value={bionLocal.chainId}>{bionLocal.chainId}</option>
        )}
        {local && (
          <option value={choraLocal.chainId}>{choraLocal.chainId}</option>
        )}
        <option value={choraTestnet.chainId}>{choraTestnet.chainId}</option>
        {local && (
          <option value={regenLocal.chainId}>{regenLocal.chainId}</option>
        )}
        <option value={regenRedwood.chainId}>{regenRedwood.chainId}</option>
      </select>
    </label>
  )
}

export default SelectNetwork
