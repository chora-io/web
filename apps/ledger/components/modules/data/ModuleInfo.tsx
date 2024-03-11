'use client'

import { dataModule } from 'cosmos/modules'
import { useState } from 'react'

import MoreInfo from '@components/modules/MoreInfo'

import styles from './ModuleInfo.module.css'

const ModuleInfo = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <>
      <button className={styles.infoButton} onClick={handleShowInfo}>
        {showInfo ? 'less info' : 'more info'}
      </button>
      <div className={styles.box}>
        {showInfo && <MoreInfo module={dataModule} />}
        <ul>
          <li>
            <a href="#convert-hash-to-iri">{'ConvertHashToIRI'}</a>
          </li>
          <li>
            <a href="#convert-iri-to-hash">{'ConvertIRIToHash'}</a>
          </li>
          <li>
            <a href="#msg-anchor">{'MsgAnchor'}</a>
          </li>
          <li>
            <a href="#msg-attest">{'MsgAttest'}</a>
          </li>
          <li>
            <a href="#msg-define-resolver">{'MsgDefineResolver'}</a>
          </li>
          <li>
            <a href="#msg-register-resolver">{'MsgRegisterResolver'}</a>
          </li>
          <li>
            <a href="#query-anchor-by-hash">{'QueryAnchorByHash'}</a>
          </li>
          <li>
            <a href="#query-anchor-by-iri">{'QueryAnchorByIRI'}</a>
          </li>
          <li>
            <a href="#query-attestations-by-attestor">
              {'QueryAttestationsByAttestor'}
            </a>
          </li>
          <li>
            <a href="#query-attestations-by-hash">
              {'QueryAttestationsByHash'}
            </a>
          </li>
          <li>
            <a href="#query-attestations-by-iri">{'QueryAttestationsByIRI'}</a>
          </li>
          <li>
            <a href="#query-resolver">{'QueryResolver'}</a>
          </li>
          <li>
            <a href="#query-resolvers-by-hash">{'QueryResolversByHash'}</a>
          </li>
          <li>
            <a href="#query-resolvers-by-iri">{'QueryResolversByIRI'}</a>
          </li>
          <li>
            <a href="#query-resolvers-by-url">{'QueryResolversByURL'}</a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default ModuleInfo
