import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"

import {
  choraTestnet,
  regenRedwood,
  regenHambach,
} from "chora/utils/chains"

const SelectNetwork = ({ id, label, selected }: any) => {

  const { network, setNetwork } = useContext(WalletContext)

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
      </select>
    </label>
  )
}

export default SelectNetwork
