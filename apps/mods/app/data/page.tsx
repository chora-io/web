'use client'

// import { Metadata } from 'next'
import { useState } from "react"

import { dataModule } from "chora/modules"

import MoreInfo from "@components/MoreInfo"
import ConvertHashToIRI from "@components/data/ConvertHashToIRI"
import ConvertIRIToHash from "@components/data/ConvertIRIToHash"
import MsgAnchor from "@components/data/MsgAnchor"
import MsgAttest from "@components/data/MsgAttest"
import MsgDefineResolver from "@components/data/MsgDefineResolver"
import MsgRegisterResolver from "@components/data/MsgRegisterResolver"
import QueryAnchorByHash from "@components/data/QueryAnchorByHash"
import QueryAnchorByIRI from "@components/data/QueryAnchorByIRI"
import QueryAttestationsByAttestor from "@components/data/QueryAttestationsByAttestor"
import QueryAttestationsByHash from "@components/data/QueryAttestationsByHash"
import QueryAttestationsByIRI from "@components/data/QueryAttestationsByIRI"
import QueryResolver from "@components/data/QueryResolver"
import QueryResolversByHash from "@components/data/QueryResolversByHash"
import QueryResolversByIRI from "@components/data/QueryResolversByIRI"
import QueryResolversByURL from "@components/data/QueryResolversByURL"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'data',
// }

const DataPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
  }

  return (
    <div className={styles.page}>
      <div>
        <h1>
          {"data module"}
        </h1>
        <button className={styles.infoButton} onClick={handleShowInfo}>
          {showInfo ? "less info" : "more info"}
        </button>
        <div className={styles.box}>
          {showInfo && <MoreInfo module={dataModule} />}
          <ul>
            <li>
              <a href="#convert-hash-to-iri">
                {'ConvertHashToIRI'}
              </a>
            </li>
            <li>
              <a href="#convert-iri-to-hash">
                {'ConvertIRIToHash'}
              </a>
            </li>
            <li>
              <a href="#msg-anchor">
                {'MsgAnchor'}
              </a>
            </li>
            <li>
              <a href="#msg-attest">
                {'MsgAttest'}
              </a>
            </li>
            <li>
              <a href="#msg-define-resolver">
                {'MsgDefineResolver'}
              </a>
            </li>
            <li>
              <a href="#msg-register-resolver">
                {'MsgRegisterResolver'}
              </a>
            </li>
            <li>
              <a href="#query-anchor-by-hash">
                {'QueryAnchorByHash'}
              </a>
            </li>
            <li>
              <a href="#query-anchor-by-iri">
                {'QueryAnchorByIRI'}
              </a>
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
              <a href="#query-attestations-by-iri">
                {'QueryAttestationsByIRI'}
              </a>
            </li>
            <li>
              <a href="#query-resolver">
                {'QueryResolver'}
              </a>
            </li>
            <li>
              <a href="#query-resolvers-by-hash">
                {'QueryResolversByHash'}
              </a>
            </li>
            <li>
              <a href="#query-resolvers-by-iri">
                {'QueryResolversByIRI'}
              </a>
            </li>
            <li>
              <a href="#query-resolvers-by-url">
                {'QueryResolversByURL'}
              </a>
            </li>
          </ul>
        </div>
        <ConvertHashToIRI/>
        <ConvertIRIToHash/>
        <MsgAnchor/>
        <MsgAttest/>
        <MsgDefineResolver/>
        <MsgRegisterResolver/>
        <QueryAnchorByHash/>
        <QueryAnchorByIRI/>
        <QueryAttestationsByAttestor/>
        <QueryAttestationsByHash/>
        <QueryAttestationsByIRI/>
        <QueryResolver/>
        <QueryResolversByHash/>
        <QueryResolversByIRI/>
        <QueryResolversByURL/>
      </div>
    </div>
  )
}

export default DataPage
