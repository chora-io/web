import * as React from "react"
import { useContext } from "react"

import { WalletContext } from "chora"
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
} from "chora/chains"

import * as styles from "./MoreInfo.module.css"

const MoreInfo = ({ module }: any) => {
  const { network } = useContext(WalletContext)

  let chainInfoX: any
  switch (network) {
    case bionLocal.chainId:
      chainInfoX = bionLocalX
    case choraLocal.chainId:
      chainInfoX = choraLocalX
    case choraTestnet.chainId:
      chainInfoX = choraTestnetX
    case regenLocal.chainId:
      chainInfoX = regenLocalX
    case regenMainnet.chainId:
      chainInfoX = regenMainnetX
    case regenRedwood.chainId:
      chainInfoX = regenRedwoodX
    default:
      chainInfoX = choraTestnetX
  }

  const renderApiInfo = () => (
    <div>
      <h4>
        {'api info (chora webkit)'}
      </h4>
      <p>
        {`api package: ${module.apiPackage}`}
      </p>
      <p>
        {`api version: `}
        <a href={module.apiVersionLink} target="_blank">
          {module.apiVersion}
        </a>
      </p>
      <p>
        {`api documentation: `}
        <a href={module.apiDocumentation} target="_blank">
          {module.apiDocumentation}
        </a>
      </p>
    </div>
  )

  const renderModuleInfo = () => {
    const m = chainInfoX.modules.find(m => m.moduleName === module.moduleName)
    return (
      <div>
        <h4>
          {'module info (selected network)'}
        </h4>
        <p>
          {`git version: `}
          <a href={m.gitVersionLink} target="_blank">
            {m.gitVersion}
          </a>
        </p>
        <p>
          {`git repository: `}
          <a href={m?.gitRepository} target="_blank">
            {m?.gitRepository}
          </a>
        </p>
        <p>
          {`specification: `}
          <a href={m?.specification} target="_blank">
            {m?.specification}
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className={styles.info}>
      {renderApiInfo()}
      {renderModuleInfo()}
    </div>
  )

}

export default MoreInfo
