import * as React from "react"
import { useContext, useEffect } from "react"

import { AuthContext, WalletContext } from "chora"
import { useNetworkServer } from "chora/hooks/useNetworkServer"

import * as styles from "./Auth.module.css"

const Auth = () => {

  const { authUser, checkAuthToken, removeAuthToken } = useContext(AuthContext)
  const { chainInfo, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // check authenticated on load
  useEffect(() => {
    if (serverUrl) {
      checkAuthToken(serverUrl)
    }
  }, [serverUrl]);

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"authenticated"}
        </h2>
        <p>
          {"whether or not the user is authenticated"}
        </p>
      </div>
      <div className={styles.boxItem}>
        <div className={styles.boxText}>
          <h3>
            {"authenticated"}
          </h3>
          <p>
            {authUser ? "true" : "false"}
          </p>
        </div>
      </div>
      {authUser && (
        <button className={styles.button} onClick={removeAuthToken}>
          {"un-authenticate"}
        </button>
      )}
    </div>
  )
}

export default Auth
