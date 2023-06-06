import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputString, Result } from "chora/components"

import * as styles from "./QueryBatchesByProject.module.css"

const queryBatchesByProject = "/regen/ecocredit/v1/batches-by-project"

const QueryBatchesByProject = () => {

  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [projectId, setProjectId] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryBatchesByProject + "/" + projectId)
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
    <div id="query-batches-by-project" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryBatchesByProject"}
        </h2>
        <p>
          {"query all credit batches by project id"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-balance-batch-project-id"
          label="project id"
          placeholder="C01-001"
          string={projectId}
          setString={setProjectId}
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

export default QueryBatchesByProject
