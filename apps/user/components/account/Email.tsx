import { useContext, useState } from "react"

import { AuthContext, WalletContext } from "chora"
import { InputString, Result } from "chora/components"
import { useNetworkServer } from "chora/hooks"

import styles from "./Email.module.css"

const Email = () => {

  const { account, activeAccount, setAccount } = useContext(AuthContext)

  const { chainInfo } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // form inputs
  const [email, setEmail] = useState<string>("")
  const [accessCode, setAccessCode] = useState<string>("")

  // authentication error
  const [error, setError] = useState<string | undefined>(undefined)

  // authenticate user with email and access code
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    // reset authentication error
    setError(undefined)

    // authenticate user with email and access code
    await fetch(serverUrl + "/auth/email", {
      method: "POST",
      body: JSON.stringify({
        token: activeAccount ? activeAccount.token : undefined,
        email,
        accessCode,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else if (data.error) {
          setError(data.error)
        } else {
          setAccount(data.user, data.token)
        }
      })
      .catch(err => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"email access code authentication"}
        </h2>
        <p>
          {"authenticate user with email access code"}
        </p>
      </div>
      <div className={styles.boxItem}>
        <div className={styles.boxText}>
          <h3>
            {"connected"}
          </h3>
          <p>
            {account && account.email ? "true" : "false"}
          </p>
        </div>
        {(!account || (account && !account.email)) ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputString
              id="email"
              label="email"
              string={email}
              setString={setEmail}
            />
            <InputString
              id="access-code"
              label="access code"
              string="access code"
              setString={setAccessCode}
              disabled // TODO: access code input
            />
            <button className={styles.button} type="submit">
              {"authenticate"}
            </button>
          </form>
        ) : (
          <div className={styles.boxText}>
            <h3>
              {"email"}
            </h3>
            <p>
              {account && account.email}
            </p>
          </div>
        )}
      </div>
      <Result error={error} />
    </div>
  )
}

export default Email
