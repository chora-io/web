import { Metadata } from 'next'

import ConvertHashToIRI from '@components/data/ConvertHashToIRI'
import ConvertIRIToHash from '@components/data/ConvertIRIToHash'
import ModuleInfo from '@components/data/ModuleInfo'
import MsgAnchor from '@components/data/MsgAnchor'
import MsgAttest from '@components/data/MsgAttest'
import MsgDefineResolver from '@components/data/MsgDefineResolver'
import MsgRegisterResolver from '@components/data/MsgRegisterResolver'
import QueryAnchorByHash from '@components/data/QueryAnchorByHash'
import QueryAnchorByIRI from '@components/data/QueryAnchorByIRI'
import QueryAttestationsByAttestor from '@components/data/QueryAttestationsByAttestor'
import QueryAttestationsByHash from '@components/data/QueryAttestationsByHash'
import QueryAttestationsByIRI from '@components/data/QueryAttestationsByIRI'
import QueryResolver from '@components/data/QueryResolver'
import QueryResolversByHash from '@components/data/QueryResolversByHash'
import QueryResolversByIRI from '@components/data/QueryResolversByIRI'
import QueryResolversByURL from '@components/data/QueryResolversByURL'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'mods | data',
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
