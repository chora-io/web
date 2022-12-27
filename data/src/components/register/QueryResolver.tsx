import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "../../contexts/WalletContext"

import InputResolverId from "../InputResolverId"
import Result from "../Result"
import SelectNetwork from "../SelectNetwork"

import * as styles from "./QueryResolver.module.css"

const queryResolver = "/regen/data/v1/resolver"

const QueryResolver = () => {

  // @ts-ignore
  const { chainInfo } = useContext(WalletContext)

  const [id, setId] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    fetch(chainInfo.rest + queryResolver + "/" + id)
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
          <InputResolverId
            id={id}
            setId={setId}
          />
          <SelectNetwork withLabel={true} />
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

export default QueryResolver
