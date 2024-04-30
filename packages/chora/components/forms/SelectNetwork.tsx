'use client'

import {
  bionLocal,
  choraLocal,
  choraTestnet,
  regenLocal,
  regenMainnet,
  regenRedwood,
} from 'cosmos/chains'
import * as React from 'react'
import { useEffect, useState } from 'react'

const defaultId = 'network'
const defaultLabel = 'network'

const SelectNetwork = ({
  id,
  label,
  network,
  setNetwork,
  testnetsOnly,
}: any) => {
  // whether component has mounted
  const [hasMounted, setHasMounted] = useState(false)

  // handle hydration
  useEffect(() => {
    setHasMounted(true)
  }, [])

  const local =
    hasMounted &&
    (window.location.hostname == '0.0.0.0' ||
      window.location.hostname == '127.0.0.1' ||
      window.location.hostname == 'localhost')

  const handleChange = (event: any) => {
    setNetwork(event.target.value)
  }

  return hasMounted ? (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      <select id={id ? id : defaultId} value={network} onChange={handleChange}>
        {local && (
          <option value={bionLocal.chainId}>{bionLocal.chainName}</option>
        )}
        {local && (
          <option value={choraLocal.chainId}>{choraLocal.chainName}</option>
        )}
        <option value={choraTestnet.chainId}>{choraTestnet.chainName}</option>
        {!testnetsOnly && (
          <option value={regenMainnet.chainId}>{regenMainnet.chainName}</option>
        )}
        {local && (
          <option value={regenLocal.chainId}>{regenLocal.chainName}</option>
        )}
        <option value={regenRedwood.chainId}>{regenRedwood.chainName}</option>
      </select>
    </label>
  ) : (
    <></>
  )
}

export default SelectNetwork
