import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "chora/utils/chains"

const SelectNetwork = ({ id, label, selected }: any) => {

  const { network, setNetwork } = useContext(WalletContext)

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  return (
    <label htmlFor={id ? id : "network"}>
      {label ? label : "network"}
      <select
        id={id ? id : "network"}
        value={selected || network}
        onChange={event => setNetwork(event.target.value)}
      >
        <option value={choraTestnet.chainId}>
          {choraTestnet.chainId}
        </option>
        <option value={regenRedwood.chainId}>
          {regenRedwood.chainId}
        </option>
        <option value={regenHambach.chainId}>
          {regenHambach.chainId}
        </option>
        {local && (
          <option value={choraLocal.chainId}>
            {choraLocal.chainId}
          </option>
        )}
        {local && (
          <option value={regenLocal.chainId}>
            {regenLocal.chainId}
          </option>
        )}
      </select>
    </label>
  )
}

export default SelectNetwork
