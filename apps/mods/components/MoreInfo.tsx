import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import {
  bionLocal,
  bionLocalX,
  choraLocal,
  choraLocalX,
  choraTestnet,
  choraTestnetX,
  regenLocal,
  regenLocalX,
  regenMainnet,
  regenMainnetX,
  regenRedwood,
  regenRedwoodX,
} from '../../../packages/cosmos/chains'

import styles from './MoreInfo.module.css'

const MoreInfo = ({ module }: any) => {
  const { network } = useContext(WalletContext)
  const [moduleInfo, setModuleInfo] = useState<any>(null)

  useEffect(() => {
    let chainInfoX: any
    switch (network) {
      case bionLocal.chainId:
        chainInfoX = bionLocalX
        break
      case choraLocal.chainId:
        chainInfoX = choraLocalX
        break
      case choraTestnet.chainId:
        chainInfoX = choraTestnetX
        break
      case regenLocal.chainId:
        chainInfoX = regenLocalX
        break
      case regenMainnet.chainId:
        chainInfoX = regenMainnetX
        break
      case regenRedwood.chainId:
        chainInfoX = regenRedwoodX
        break
      default:
        chainInfoX = choraTestnetX
        break
    }
    setModuleInfo(
      chainInfoX.modules.find((m: any) => m.moduleName === module.moduleName),
    )
  }, [module, network])

  const renderApiInfo = () => (
    <div>
      <h4>{'api information (chora webkit)'}</h4>
      <p>{`api package: ${module.apiPackage}`}</p>
      <p>
        {`api documentation: `}
        <a href={module.apiDocumentation} target="_blank">
          {module.apiDocumentation}
        </a>
      </p>
      <p>
        {`api version: `}
        <a href={module.apiVersionLink} target="_blank">
          {module.apiVersion}
        </a>
      </p>
    </div>
  )

  const renderModuleInfo = () => (
    <div>
      <h4>{`module information (${network})`}</h4>
      <p>
        {`documentation: `}
        <a href={moduleInfo.documentation} target="_blank">
          {moduleInfo.documentation}
        </a>
      </p>
      <p>
        {`git repository: `}
        <a href={moduleInfo.gitRepository} target="_blank">
          {moduleInfo.gitRepository}
        </a>
      </p>
      <p>
        {`git version: `}
        <a href={moduleInfo.gitVersionLink} target="_blank">
          {moduleInfo.gitVersion}
        </a>
      </p>
    </div>
  )

  return (
    <div className={styles.info}>
      {renderApiInfo()}
      {moduleInfo ? (
        <>{renderModuleInfo()}</>
      ) : (
        <div className={styles.error}>
          {'not available on selected network'}
        </div>
      )}
    </div>
  )
}

export default MoreInfo
