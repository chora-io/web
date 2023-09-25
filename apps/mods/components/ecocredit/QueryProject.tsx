import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputString, Result } from "chora/components"

import styles from "./QueryProject.module.css"

const queryProject = "/regen/ecocredit/v1/project"

const QueryProject = () => {

  const { chainInfo } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryProject + "/" + id)
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
    <div id="query-project" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryProject"}
        </h2>
        <p>
          {"query a project by id"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputString
          id="query-project-id"
          label="project id"
          placeholder="C01-001"
          string={id}
          setString={setId}
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

export default QueryProject
