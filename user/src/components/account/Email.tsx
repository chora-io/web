import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { AuthContext, WalletContext } from "chora"
import { Result } from "chora/components"
import { useNetworkServer } from "chora/hooks/useNetworkServer"

import * as styles from "./Email.module.css"

const Email = () => {

  const { authUser, checkAuthToken, setAuthToken, setAuthUser } = useContext(AuthContext)
  const { chainInfo, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // authentication error
  const [error, setError] = useState<string | undefined>(undefined)

  // check authenticated on load
  useEffect(() => {
    if (serverUrl) {
      checkAuthToken(serverUrl)
    }
  }, [serverUrl]);

  // authenticate user with email and password
  const handleAuthenticate = async () => {
    setError("")

    // authenticate user with email and password
    await fetch(serverUrl + "/auth/login", {
      method: "POST",
      body: `{"email": "[ email ]", "password": "[ password ]"}`,
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else if (data.error) {
          setError(data.error)
        } else {
          setAuthToken(data.token)

          // TODO: return user information from chora server
          setAuthUser({ ...authUser, email: "[ email ]" })

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
          {"email authentication"}
        </h2>
        <p>
          {"authenticate user with email and password"}
        </p>
      </div>
        <div className={styles.boxItem}>
          <div className={styles.boxText}>
            <h3>
              {"connected"}
            </h3>
            <p>
              {authUser && authUser.email ? "true" : "false"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"email"}
            </h3>
            <p>
              {"[ email ]"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"password"}
            </h3>
            <p>
              {"[ password ]"}
            </p>
          </div>
        </div>
      {(!authUser || (authUser && !authUser.email)) && (
        <button className={styles.button} onClick={handleAuthenticate}>
          {"authenticate"}
        </button>
      )}
      <Result error={error} />
    </div>
  )
}

export default Email
