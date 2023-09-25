import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputAddress, Result } from "chora/components"

import styles from "./QueryGroupsByAdmin.module.css"

const queryGroupsByAdmin = "/cosmos/group/v1/groups_by_admin"

const QueryGroupsByAdmin = () => {

  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [admin, setAdmin] = useState<string>("")

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryGroupsByAdmin + "/" + admin)
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
    <div id="query-groups-by-admin" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryGroupsByAdmin"}
        </h2>
        <p>
          {"query groups by the address of the admin"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-groups-by-admin-admin"
          label="admin"
          network={network}
          address={admin}
          setAddress={setAdmin}
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

export default QueryGroupsByAdmin
