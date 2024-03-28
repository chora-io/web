import { useEffect, useState } from 'react'

import {
  bionLocalX,
  choraLocalX,
  choraTestnetX,
  regenLocalX,
  regenRedwoodX,
  regenMainnetX,
} from 'cosmos/chains'

export const useNetworkModules = (chainInfo: any) => {
  const [modules, setModules] = useState<any[] | null>(null)

  useEffect(() => {
    if (chainInfo) {
      switch (chainInfo.chainId) {
        case 'bion-local':
          setModules(bionLocalX.modules)
          break
        case 'chora-local':
          setModules(choraLocalX.modules)
          break
        case 'chora-testnet-1':
          setModules(choraTestnetX.modules)
          break
        case 'regen-local':
          setModules(regenLocalX.modules)
          break
        case 'regen-redwood-1':
          setModules(regenRedwoodX.modules)
          break
        case 'regen-1':
          setModules(regenMainnetX.modules)
          break
          // network not supported
          setModules(null)
          break
      }
    } else {
      // network not available
      setModules(null)
    }
  }, [chainInfo])

  return [modules]
}
