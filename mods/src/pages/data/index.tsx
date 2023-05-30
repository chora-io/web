import * as React from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/SeoWrapper"

import ConvertHashToIRI from "../../components/data/ConvertHashToIRI"
import ConvertIRIToHash from "../../components/data/ConvertIRIToHash"
import MsgAnchor from "../../components/data/MsgAnchor"
import MsgAttest from "../../components/data/MsgAttest"
import MsgDefineResolver from "../../components/data/MsgDefineResolver"
import MsgRegisterResolver from "../../components/data/MsgRegisterResolver"
import QueryAnchorByHash from "../../components/data/QueryAnchorByHash"
import QueryAnchorByIRI from "../../components/data/QueryAnchorByIRI"
import QueryAttestationsByAttestor from "../../components/data/QueryAttestationsByAttestor"
import QueryAttestationsByHash from "../../components/data/QueryAttestationsByHash"
import QueryAttestationsByIRI from "../../components/data/QueryAttestationsByIRI"
import QueryResolver from "../../components/data/QueryResolver"
import QueryResolversByHash from "../../components/data/QueryResolversByHash"
import QueryResolversByIRI from "../../components/data/QueryResolversByIRI"
import QueryResolversByURL from "../../components/data/QueryResolversByURL"

import * as styles from "./index.module.css"

const DataPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <h1>
          {"data module"}
        </h1>
        <ConvertHashToIRI />
        <ConvertIRIToHash />
        <MsgAnchor />
        <MsgAttest />
        <MsgDefineResolver />
        <MsgRegisterResolver />
        <QueryAnchorByIRI />
        <QueryAnchorByHash />
        <QueryAttestationsByAttestor />
        <QueryAttestationsByIRI />
        <QueryAttestationsByHash />
        <QueryResolver />
        <QueryResolversByURL />
        <QueryResolversByIRI />
        <QueryResolversByHash />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default DataPage
