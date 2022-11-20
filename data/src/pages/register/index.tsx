import * as React from "react";
import { useState, useEffect } from "react"

import Main from "../../layouts/Main"
import Seo from "../../components/Seo"
import Sidebar from "../../components/Sidebar"

import * as styles from "./index.module.css"

const regenRedwoodUrl = "https://redwood.chora.io/rest"
const regenHambachUrl = "https://hambach.chora.io/rest"

const queryResolver = "/regen/data/v1/resolver/1"

const resolver = {
  id: "",
  manager: "",
  url: "",
}

const Register = () => {
  const [regenRedwoodResolver, setRegenRedwoodResolver] = useState(resolver);
  const [regenRedwoodError, setRegenRedwoodError] = useState<string>("");

  const [regenHambachResolver, setRegenHambachResolver] = useState(resolver);
  const [regenHambachError, setRegenHambachError] = useState<string>("");

  useEffect(() => {
    fetch(regenRedwoodUrl + queryResolver)
      .then(res => res.json())
      .then(data => {
        setRegenRedwoodResolver(data.resolver);
      })
      .catch(err => {
        setRegenRedwoodError(err.message);
      });

    fetch(regenHambachUrl + queryResolver)
      .then(res => res.json())
      .then(data => {
        setRegenHambachResolver(data.resolver);
      })
      .catch(err => {
        setRegenHambachError(err.message);
      });
   }, []);

  return (
    <Main>
      <div className={styles.container}>
        <div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"define resolver"}
            </div>
            <div>
              {"..."}
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"register data to resolver"}
            </div>
            <div>
              {"..."}
            </div>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              {"search resolvers"}
            </div>
            {regenRedwoodError == "" ? (
              <div>
                <p>
                  {"chain: regen-redwood-1"}
                </p>
                <p>
                  {"id: " + regenRedwoodResolver.id}
                </p>
                <p>
                  {"manager: " + regenRedwoodResolver.manager}
                </p>
                <p>
                  {"url: " + regenRedwoodResolver.url}
                </p>
              </div>
            ): (
              <div>
                <p className={styles.error}>
                  {regenRedwoodError}
                </p>
                <p className={styles.error}>
                  {regenRedwoodUrl}
                </p>
              </div>
            )}
            {regenHambachError == "" ? (
              <div>
                <p>
                  {"chain: regen-hambach-2"}
                </p>
                <p>
                  {"id: " + regenHambachResolver.id}
                </p>
                <p>
                  {"manager: " + regenHambachResolver.manager}
                </p>
                <p>
                  {"url: " + regenHambachResolver.url}
                </p>
              </div>
            ): (
              <div>
                <p className={styles.error}>
                  {regenHambachError}
                </p>
                <p className={styles.error}>
                  {regenHambachUrl}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Head = () => <Seo title="" />

export default Register
