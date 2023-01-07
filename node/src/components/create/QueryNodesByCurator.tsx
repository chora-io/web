import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"

import InputAddress from "../InputAddress"
import Result from "../Result"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryNode.module.css"

const queryNodesByCurator = "/chora/geonode/v1/nodes-by-curator"

const QueryNodesByCurator = () => {

  const { chainInfo } = useContext(WalletContext)

  // form input
  const [curator, setCurator] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryNodesByCurator + "/" + curator)
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
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputAddress
            id="node-curator"
            label="node curator"
            address={curator}
            setAddress={setCurator}
          />
          <SelectNetwork />
          <button type="submit">
            {"search"}
          </button>
        </form>
      </div>
      <Result
        error={error}
        success={success}
      />
    </>
  )
}

export default QueryNodesByCurator
