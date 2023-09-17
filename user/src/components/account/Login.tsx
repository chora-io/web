import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { AuthContext, WalletContext } from "chora"
import { InputString, Result } from "chora/components"
import { useNetworkServer } from "chora/hooks/useNetworkServer"

import * as styles from "./Login.module.css"

const Login = () => {

  const { authUser, checkAuthToken, getAuthToken, setAuthToken, setAuthUser } = useContext(AuthContext)
  const { chainInfo } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // form input
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  // authentication error
  const [error, setError] = useState<string | undefined>(undefined)

  // check authenticated on load
  useEffect(() => {
    if (serverUrl) {
      checkAuthToken(serverUrl)
    }
  }, [serverUrl]);

  // authenticate user with username and password
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")

    // get authentication token
    const token = getAuthToken()

    // authenticate user with username and password
    await fetch(serverUrl + "/auth/login", {
      method: "POST",
      body: JSON.stringify({
        token,
        username,
        password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else if (data.error) {
          setError(data.error)
        } else {
          setAuthToken(data.token)
          setAuthUser(data.user)
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
          {"username and password authentication"}
        </h2>
        <p>
          {"authenticate user with username and password"}
        </p>
      </div>
      <div className={styles.boxItem}>
        <div className={styles.boxText}>
          <h3>
            {"connected"}
          </h3>
          <p>
            {authUser && authUser.username ? "true" : "false"}
          </p>
        </div>
        {(!authUser || (authUser && !authUser.username)) ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <InputString
              id="username"
              label="username"
              string={username}
              setString={setUsername}
            />
            <InputString
              id="password"
              label="password"
              string="password"
              disabled // TODO: password input
            />
            <button className={styles.button} type="submit">
              {"authenticate"}
            </button>
          </form>
        ) : (
          <div className={styles.boxText}>
            <h3>
              {"username"}
            </h3>
            <p>
              {authUser && authUser.username}
            </p>
          </div>
        )}
      </div>
      <Result error={error} />
    </div>
  )
}

export default Login
