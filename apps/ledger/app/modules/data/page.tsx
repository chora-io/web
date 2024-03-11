import { Metadata } from 'next'

import ConvertHashToIRI from '@components/modules/data/ConvertHashToIRI'
import ConvertIRIToHash from '@components/modules/data/ConvertIRIToHash'
import ModuleInfo from '@components/modules/data/ModuleInfo'
import MsgAnchor from '@components/modules/data/MsgAnchor'
import MsgAttest from '@components/modules/data/MsgAttest'
import MsgDefineResolver from '@components/modules/data/MsgDefineResolver'
import MsgRegisterResolver from '@components/modules/data/MsgRegisterResolver'
import QueryAnchorByHash from '@components/modules/data/QueryAnchorByHash'
import QueryAnchorByIRI from '@components/modules/data/QueryAnchorByIRI'
import QueryAttestationsByAttestor from '@components/modules/data/QueryAttestationsByAttestor'
import QueryAttestationsByHash from '@components/modules/data/QueryAttestationsByHash'
import QueryAttestationsByIRI from '@components/modules/data/QueryAttestationsByIRI'
import QueryResolver from '@components/modules/data/QueryResolver'
import QueryResolversByHash from '@components/modules/data/QueryResolversByHash'
import QueryResolversByIRI from '@components/modules/data/QueryResolversByIRI'
import QueryResolversByURL from '@components/modules/data/QueryResolversByURL'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const DataPage = () => {
  return (
    <div className={styles.page}>
      <div>
        <h1>{'data module'}</h1>
        <ModuleInfo />
        <ConvertHashToIRI />
        <ConvertIRIToHash />
        <MsgAnchor />
        <MsgAttest />
        <MsgDefineResolver />
        <MsgRegisterResolver />
        <QueryAnchorByHash />
        <QueryAnchorByIRI />
        <QueryAttestationsByAttestor />
        <QueryAttestationsByHash />
        <QueryAttestationsByIRI />
        <QueryResolver />
        <QueryResolversByHash />
        <QueryResolversByIRI />
        <QueryResolversByURL />
      </div>
    </div>
  )
}

export default DataPage
