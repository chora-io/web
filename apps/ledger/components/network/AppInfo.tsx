'use client'

import { useContext } from 'react'

import { NetworkContext } from '@contexts/NetworkContext'

import styles from './LatestBlock.module.css'

const AppInfo = () => {
  const { appInfo, nodeInfo } = useContext(NetworkContext)

  return (
    <div className={styles.box}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'app name'}</td>
              <td>{'app version'}</td>
              <td>{'cosmos sdk version'}</td>
              <td>{'comet bft version'}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{appInfo ? appInfo['app_name'] : 'loading...'}</td>
              <td>
                {appInfo
                  ? appInfo.version[0] === 'v'
                    ? appInfo.version
                    : `v${appInfo.version}`
                  : 'loading...'}
              </td>
              <td>
                {appInfo
                  ? appInfo['cosmos_sdk_version'][0] === 'v'
                    ? appInfo['cosmos_sdk_version']
                    : `v${appInfo['cosmos_sdk_version']}`
                  : 'loading...'}
              </td>
              <td>
                {nodeInfo
                  ? nodeInfo['version'][0] === 'v'
                    ? nodeInfo['version']
                    : `v${nodeInfo['version']}`
                  : 'loading...'}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AppInfo
