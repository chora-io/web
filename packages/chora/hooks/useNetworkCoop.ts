import { useEffect, useState } from 'react'

import {
  bionLocalX,
  choraLocalX,
  choraTestnetX,
  regenLocalX,
  regenRedwoodX,
  regenMainnetX,
} from '../chains'

export const useNetworkCoop = (chainInfo: any) => {
  const [groupId, setGroupId] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (chainInfo) {
      switch (chainInfo.chainId) {
        case 'bion-local':
          setGroupId(bionLocalX.coopId)
          break
        case 'chora-local':
          setGroupId(choraLocalX.coopId)
          break
        case 'chora-testnet-1':
          setGroupId(choraTestnetX.coopId)
          break
        case 'regen-local':
          setGroupId(regenLocalX.coopId)
          break
        case 'regen-redwood-1':
          setGroupId(regenRedwoodX.coopId)
          break
        case 'regen-1':
          setGroupId(regenMainnetX.coopId)
          break
        default:
          // network not supported
          setGroupId(undefined)
          break
      }
    } else {
      // network not available
      setGroupId(undefined)
    }
  }, [chainInfo])

  return [groupId]
}
