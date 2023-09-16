import * as React from "react"
import { useState } from "react"
import { navigate } from "gatsby"

import { InputAddress, Result } from "chora/components"

import * as styles from "./Accounts.module.css"

const queryAccount = "cosmos/auth/v1beta1/accounts"

const Accounts = ({ chainId, rest }) => {
  const [address, setAddress] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")

    // TODO: validate address

    if (address) {

      // TODO: custom account page
      // navigate(`?address=${address}`)

      navigate(rest + "/" + queryAccount + "/" + address)
    } else {
      setError("address cannot be empty")
    }
  }

  return (
      <div className={styles.box}>
        <div>
          <h2>
            {"accounts"}
          </h2>
        </div>
        <form className={styles.form}>
          <InputAddress
            id="accounts"
            label=""
            network={chainId}
            address={address}
            setAddress={setAddress}
          />
          <button type="submit" onClick={handleSubmit}>
            {"search"}
          </button>
        </form>
        {error && (
          <div className={styles.result}>
            <Result error={error} />
          </div>
        )}
      </div>
  )
}

export default Accounts
