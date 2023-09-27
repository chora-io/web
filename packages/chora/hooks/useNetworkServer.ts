import { useEffect, useState } from 'react'

import {
  bionLocalX,
  choraLocalX,
  choraTestnetX,
  regenLocalX,
  regenRedwoodX,
  regenMainnetX,
} from 'chora/chains'

export const useNetworkServer = (chainInfo: any) => {
  const [serverUrl, setServerUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (chainInfo) {
      switch (chainInfo.chainId) {
        case 'bion-local':
          setServerUrl(bionLocalX.server)
          break
        case 'chora-local':
          setServerUrl(choraLocalX.server)
          break
        case 'chora-testnet-1':
          setServerUrl(choraTestnetX.server)
          break
        case 'regen-local':
          setServerUrl(regenLocalX.server)
          break
        case 'regen-redwood-1':
          setServerUrl(regenRedwoodX.server)
          break
        case 'regen-1':
          setServerUrl(regenMainnetX.server)
          break
          // network not supported
          setServerUrl(undefined)
          break
      }
    } else {
      // network not available
      setServerUrl(undefined)
    }
  }, [chainInfo])

  return [serverUrl]
}
