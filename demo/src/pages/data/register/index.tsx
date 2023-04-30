import * as React from "react"

import Main from "../../../layouts/Main"
import Seo from "../../../components/SeoWrapper"

import MsgDefineResolver from "../../../components/data/register/MsgDefineResolver"
import MsgRegisterResolver from "../../../components/data/register/MsgRegisterResolver"
import QueryResolver from "../../../components/data/register/QueryResolver"
import QueryResolversByHash from "../../../components/data/register/QueryResolversByHash"
import QueryResolversByIRI from "../../../components/data/register/QueryResolversByIRI"
import QueryResolversByURL from "../../../components/data/register/QueryResolversByURL"

import * as styles from "./index.module.css"

const RegisterPage = () => (
  <Main>
    <div className={styles.page}>
      <div>
        <MsgDefineResolver />
        <MsgRegisterResolver />
        <QueryResolver />
        <QueryResolversByURL />
        <QueryResolversByIRI />
        <QueryResolversByHash />
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default RegisterPage
