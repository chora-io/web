import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { Result } from "chora/components"

import styles from "./QueryBatches.module.css"

const queryBatches = "/regen/ecocredit/v1/batches"

const QueryBatches = () => {

  const { chainInfo } = useContext(WalletContext)

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryBatches)
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
    <div id="query-batches" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryBatches"}
        </h2>
        <p>
          {"query all credit batches"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
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

export default QueryBatches
