import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "../context/WalletContext"

import {
  choraLocal,
  choraTestnet,
  regenLocal,
  regenRedwood,
  regenHambach,
} from "../utils/chains"

const SelectNetwork = ({ withLabel }: any) => {

  // @ts-ignore
  const { network, setChainInfo, setNetwork } = useContext(WalletContext)

  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) {
    local = true
  }

  const handleChange = (event: any) => {
    event.preventDefault()

    setNetwork(event.target.value)

    switch (event.target.value) {
      case choraLocal.chainId:
        setChainInfo(choraLocal)
        break
      case choraTestnet.chainId:
        setChainInfo(choraTestnet)
        break
      case regenLocal.chainId:
        setChainInfo(regenLocal)
        break
      case regenRedwood.chainId:
        setChainInfo(regenRedwood)
        break
      case regenHambach.chainId:
        setChainInfo(regenHambach)
        break
    }
  }

  return (
    <label htmlFor="network">
      {withLabel ? "network" : ""}
      <select
        id="network"
        value={network}
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
