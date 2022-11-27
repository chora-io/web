import * as React from "react"
import { useContext } from "react"

import { cachedNetworkKey, WalletContext } from "../context/WalletContext"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../utils/chains"

const SelectNetwork = ({ value, withLabel }: any) => {

  // @ts-ignore
  const { network, setNetwork, setWallet, setError } = useContext(WalletContext)

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  const handleChange = (event: any) => {
    event.preventDefault()
    setError("")
    setNetwork(event.target.value)
    // store network in local storage to reset on page reload
    localStorage.setItem(cachedNetworkKey, event.target.value)
  }

  return (
    <label htmlFor="network">
      {withLabel ? "network" : ""}
      <select
        id="network"
        value={value || network}
        onChange={handleChange}
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
