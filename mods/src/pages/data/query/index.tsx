import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import ConvertHashToIRI from "../../../components/data/query/ConvertHashToIRI"
import ConvertIRIToHash from "../../../components/data/query/ConvertIRIToHash"
import QueryAnchorByHash from "../../../components/data/query/QueryAnchorByHash"
import QueryAnchorByIRI from "../../../components/data/query/QueryAnchorByIRI"
import QueryAttestationsByAttestor from "../../../components/data/query/QueryAttestationsByAttestor"
import QueryAttestationsByHash from "../../../components/data/query/QueryAttestationsByHash"
import QueryAttestationsByIRI from "../../../components/data/query/QueryAttestationsByIRI"
import QueryResolver from "../../../components/data/query/QueryResolver"
import QueryResolversByHash from "../../../components/data/query/QueryResolversByHash"
import QueryResolversByIRI from "../../../components/data/query/QueryResolversByIRI"
import QueryResolversByURL from "../../../components/data/query/QueryResolversByURL"

import * as styles from "./index.module.css"

const DataQueryPage = ({ location }) => (
  <Main location={location}>
    <div className={styles.page}>
      <div>
        <ConvertHashToIRI />
        <ConvertIRIToHash />
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

export default DataQueryPage
