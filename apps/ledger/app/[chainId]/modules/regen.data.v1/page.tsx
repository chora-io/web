import { Metadata } from 'next'

import ConvertHashToIRI from '@components/modules/regen.data.v1/ConvertHashToIRI'
import ConvertIRIToHash from '@components/modules/regen.data.v1/ConvertIRIToHash'
import ModuleInfo from '@components/modules/regen.data.v1/ModuleInfo'
import MsgAnchor from '@components/modules/regen.data.v1/MsgAnchor'
import MsgAttest from '@components/modules/regen.data.v1/MsgAttest'
import MsgDefineResolver from '@components/modules/regen.data.v1/MsgDefineResolver'
import MsgRegisterResolver from '@components/modules/regen.data.v1/MsgRegisterResolver'
import QueryAnchorByHash from '@components/modules/regen.data.v1/QueryAnchorByHash'
import QueryAnchorByIRI from '@components/modules/regen.data.v1/QueryAnchorByIRI'
import QueryAttestationsByAttestor from '@components/modules/regen.data.v1/QueryAttestationsByAttestor'
import QueryAttestationsByHash from '@components/modules/regen.data.v1/QueryAttestationsByHash'
import QueryAttestationsByIRI from '@components/modules/regen.data.v1/QueryAttestationsByIRI'
import QueryResolver from '@components/modules/regen.data.v1/QueryResolver'
import QueryResolversByHash from '@components/modules/regen.data.v1/QueryResolversByHash'
import QueryResolversByIRI from '@components/modules/regen.data.v1/QueryResolversByIRI'
import QueryResolversByURL from '@components/modules/regen.data.v1/QueryResolversByURL'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: `chora ledger`,
}

const ModulePage = () => {
  return (
    <div className={styles.page}>
      <h1>{'regen.data.v1'}</h1>
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
  )
}

export default ModulePage
