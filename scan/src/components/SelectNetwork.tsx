import * as React from "react"

import {
    choraTestnet,
    regenMainnet,
    regenRedwood,
} from "chora/utils/chains"

const SelectNetwork = ({ network, setNetwork }: any) => {
  let local = false
  if (typeof window !== "undefined" && (
      window.location.hostname == "0.0.0.0" ||
      window.location.hostname == "127.0.0.1" ||
      window.location.hostname == "localhost"
    )
  ) { local = true }

  return (
    <label>
      <select
        value={network}
        onChange={event => setNetwork(event.target.value)}
      >
        <option value="">
            {'-- select network --'}
        </option>
        <option value={regenMainnet.chainId}>
          {regenMainnet.chainId}
        </option>
        <option value={regenRedwood.chainId}>
          {regenRedwood.chainId}
        </option>
        <option value={choraTestnet.chainId}>
          {choraTestnet.chainId}
        </option>
        {local && (
          <option value="local-testnet">
            {'local testnet'}
          </option>
        )}
      </select>
    </label>
  )
}

export default SelectNetwork
