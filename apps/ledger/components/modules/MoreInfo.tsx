import { WalletContext } from 'chora/contexts'
import { useNetworkModules } from 'chora/hooks'
import { useContext, useEffect, useState } from 'react'

import styles from './MoreInfo.module.css'

const MoreInfo = ({ module }: any) => {
  const { chainInfo, network } = useContext(WalletContext)

  const [modules] = useNetworkModules(chainInfo)

  const [moduleInfo, setModuleInfo] = useState<any>(null)

  useEffect(() => {
    if (modules) {
      setModuleInfo(
        modules.find((m: any) => m.apiPackage === module.apiPackage),
      )
    }
  }, [modules, module.apiPackage])

  const renderApiInfo = () => (
    <div>
      <h4>{'api information (chora webkit)'}</h4>
      <p>{`api repository: ${module.apiRepository}`}</p>
      <p>{`api version: ${module.apiVersion}`}</p>
      <a href={module.documentation} target="_blank">
        {'view api documentation'}
      </a>
    </div>
  )

  const renderModuleInfo = () => (
    <div>
      <h4>{`module information (${network})`}</h4>
      <p>{`git repository: ${moduleInfo.gitRepository}`}</p>
      <p>{`git version: ${moduleInfo.gitVersion}`}</p>
      <a href={moduleInfo.documentation} target="_blank">
        {'view module documentation'}
      </a>
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
