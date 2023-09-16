import { useEffect, useState } from "react"

import {
  choraLocalX,
  choraTestnetX,
  regenLocalX,
  regenRedwoodX,
  regenMainnetX,
} from "chora/chains"

export const useCoopParams = (chainInfo: any) => {
  const [groupId, setGroupId] = useState<string | undefined>(undefined)
  const [serverUrl, setServerUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (chainInfo) {
      switch (chainInfo.chainId) {
        case 'chora-local':
          setGroupId(choraLocalX.coopId)
          setServerUrl(choraLocalX.server)
          break
        case 'chora-testnet-1':
          setGroupId(choraTestnetX.coopId)
          setServerUrl(choraTestnetX.server)
          break
        case 'regen-local':
          setGroupId(regenLocalX.coopId)
          setServerUrl(regenLocalX.server)
          break
        case 'regen-redwood-1':
          setGroupId(regenRedwoodX.coopId)
          setServerUrl(regenRedwoodX.server)
          break
        case 'regen-1':
          setGroupId(regenMainnetX.coopId)
          setServerUrl(regenMainnetX.server)
          break
        default:
          // network not supported
          break
      }
    }
  }, [chainInfo])

  return [groupId, serverUrl]
}
