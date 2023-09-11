import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { Result } from "chora/components"

import * as styles from "./DataResolvers.module.css"

const queryResolver = "/regen/data/v1/resolver"

const DataResolvers = () => {

  const { chainInfo, network } = useContext(WalletContext)

  // error and resolvers
  const [error, setError] = useState<string>("")
  const [resolvers, setResolvers] = useState<any[]>([])

  useEffect(() => {
    setError("")
    if (chainInfo) {
      fetchResolvers().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch resolvers by incrementing id until not found
  const fetchResolvers = async () => {
    let nextId = 1
    let resolvers = []
    while (nextId !== 0) {
      await fetch(chainInfo.rest + "/" + queryResolver + "/" + nextId)
        .then(res => res.json())
        .then(res => {
          if (res.code) {
            nextId = 0
          } else {
            resolvers.push(res["resolver"])
            nextId++
          }
        })
        .catch(err => {
          setError(err.message)
        })
    }
    setResolvers(resolvers)
  }

  if (chainInfo === undefined) {
    return <>{"loading"}</>
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"data resolvers"}
        </h2>
        <p>
          {`data resolvers registered on ${network}`}
        </p>
      </div>
      {resolvers.map(resolver => (
        <div className={styles.boxItem}>
          <div className={styles.boxText}>
            <h3>
              {"id"}
            </h3>
            <p>
              {resolver["id"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"url"}
            </h3>
            <p>
              {resolver["url"]}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"manager"}
            </h3>
            <p>
              {resolver["manager"]}
            </p>
          </div>
        </div>
      ))}
      {network && resolvers.length === 0 && (
        <p>
          {`no data resolvers found on ${network}`}
        </p>
      )}
      <Result error={error} />
    </div>
  )
}

export default DataResolvers
