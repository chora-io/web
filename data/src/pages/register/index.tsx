import * as React from "react";

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import MsgDefineResolver from "../../components/register/MsgDefineResolver"
import MsgRegisterResolver from "../../components/register/MsgRegisterResolver"
import QueryResolver from "../../components/register/QueryResolver"
import QueryResolversByURL from "../../components/register/QueryResolversByURL"
import QueryResolversByIRI from "../../components/register/QueryResolversByIRI"
import QueryResolversByHash from "../../components/register/QueryResolversByHash"

import * as styles from "./index.module.css"

const Register = () => {

  // ...

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"define resolver"}
            </div>
            <MsgDefineResolver />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"register data to resolver"}
            </div>
            <MsgRegisterResolver />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search resolvers by id"}
            </div>
            <QueryResolver />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search resolvers by url"}
            </div>
            <QueryResolversByURL />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search resolvers by data iri"}
            </div>
            <QueryResolversByIRI />
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search resolvers by data content hash"}
            </div>
            <QueryResolversByHash />
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Register
