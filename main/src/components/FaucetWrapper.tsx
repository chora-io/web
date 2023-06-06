import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"
import { Faucet } from "chora/components"

const FaucetWrapper = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  return (
    <Faucet
      chainInfo={chainInfo}
      wallet={wallet}
    />
  )
}

export default FaucetWrapper
