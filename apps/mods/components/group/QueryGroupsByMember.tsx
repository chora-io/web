import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { InputAddress, Result } from "chora/components"

import styles from "./QueryGroupsByMember.module.css"

const queryGroupsByAdmin = "/cosmos/group/v1/groups_by_member"

const QueryGroupsByMember = () => {

  const { chainInfo, network } = useContext(WalletContext)

  // form input
  const [member, setMember] = useState<string>("")

  // error and success
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    fetch(chainInfo.rest + queryGroupsByAdmin + "/" + member)
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
    <div id="query-groups-by-member" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"QueryGroupsByMember"}
        </h2>
        <p>
          {"query groups by the address of a member"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="query-groups-by-member-member"
          label="member"
          network={network}
          address={member}
          setAddress={setMember}
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

export default QueryGroupsByMember
