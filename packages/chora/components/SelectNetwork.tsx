import {
  bionLocal,
  choraLocal,
  choraTestnet,
  regenLocal,
  regenMainnet,
  regenRedwood,
} from 'cosmos/chains'
import * as React from 'react'

const defaultId = 'network'
const defaultLabel = 'network'

const SelectNetwork = ({
  id,
  label,
  network,
  selected,
  setNetwork,
  testnets,
}: any) => {
  let local = false
  if (
    typeof window !== 'undefined' &&
    (window.location.hostname == '0.0.0.0' ||
      window.location.hostname == '127.0.0.1' ||
      window.location.hostname == 'localhost')
  ) {
    local = true
  }

  const handleChange = (event: any) => {
    setNetwork(event.target.value)
  }

  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <select
        id={id ? id : defaultId}
        value={selected || network}
        onChange={handleChange}
      >
        {local && (
          <option value={bionLocal.chainId}>{bionLocal.chainName}</option>
        )}
        {local && (
          <option value={choraLocal.chainId}>{choraLocal.chainName}</option>
        )}
        <option value={choraTestnet.chainId}>{choraTestnet.chainName}</option>
        {!testnets && (
          <option value={regenMainnet.chainId}>{regenMainnet.chainName}</option>
        )}
        {local && (
          <option value={regenLocal.chainId}>{regenLocal.chainName}</option>
        )}
        <option value={regenRedwood.chainId}>{regenRedwood.chainName}</option>
      </select>
    </label>
  )
}

export default SelectNetwork
