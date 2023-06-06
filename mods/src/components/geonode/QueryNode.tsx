import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputNumber, Result } from "chora/components"

import * as styles from "./QueryNode.module.css"

const queryNode = "/chora/geonode/v1/node"

const QueryNode = () => {

  const { chainInfo } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryNode + "/" + id)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          setSuccess(JSON.stringify(data, null, "  "))
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div id="query-node" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryNode"}
        </h2>
        <p>
          {"query a node by the id of the node"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputNumber
          id="query-node-id"
          label="node id"
          number={id}
          setNumber={setId}
        />
        <button type="submit">
          {"search"}
        </button>
      </form>
      <Result
        error={error}
        success={success}
      />
    </div>
  )
}

export default QueryNode
