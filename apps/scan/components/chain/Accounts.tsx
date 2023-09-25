import { useState } from "react"
import { useRouter } from "next/navigation"

import { InputAddress, Result } from "chora/components"

import styles from "./Accounts.module.css"

const queryAccount = "cosmos/auth/v1beta1/accounts"

const Accounts = ({ chainId, rest }: any) => {

  const router = useRouter()

  const [address, setAddress] = useState<string>("")
  const [error, setError] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)

    // TODO: validate address

    if (address) {

      // TODO: custom account page
      // router.push(`?address=${address}`)

      router.push(rest + "/" + queryAccount + "/" + address)
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
