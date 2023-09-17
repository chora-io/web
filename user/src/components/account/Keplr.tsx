import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { AuthContext, WalletContext } from "chora"
import { Result } from "chora/components"
import { useNetworkServer } from "chora/hooks/useNetworkServer"

import * as styles from "./Keplr.module.css"

const Keplr = () => {

  const { authUser, checkAuthToken, getAuthToken, setAuthToken, setAuthUser } = useContext(AuthContext)
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

  // authenticate user with keplr arbitrary message signing
  const handleAuthenticate = async () => {
    setError("")

    if (!wallet) {
      setError("keplr wallet not detected")
      return
    }

    // TODO: data to sign
    const data = new Uint8Array(1)

    // signature for authentication
    let signature: any

    // sign data and set signature
    await window?.keplr?.signArbitrary(chainInfo.chainId, wallet.bech32Address, data).then(res => {
      signature = res.signature
    }).catch(err => {
      setError(err.message)
    })

    // new authentication request
    await fetch(serverUrl + "/auth/keplr", {
      method: "POST",
      body: JSON.stringify({
        token: getAuthToken(),
        address: wallet.bech32Address,
        signature,
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
          {"keplr authentication"}
        </h2>
        <p>
          {"authenticate user with arbitrary message signing"}
        </p>
      </div>
      {wallet ? (
        <div className={styles.boxItem}>
          <div className={styles.boxText}>
            <h3>
              {"connected"}
            </h3>
            <p>
              {authUser && authUser.address ? "true" : "false"}
            </p>
          </div>
          <div className={styles.boxText}>
            <h3>
              {"address"}
            </h3>
            <p>
              {(authUser && authUser.address) || wallet.bech32Address}
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.boxItem}>
          <p>
            {"keplr wallet not detected, unable to authenticate"}
          </p>
        </div>
      )}
      {(!authUser || (authUser && !authUser.address)) && (
        <button className={styles.button} onClick={handleAuthenticate}>
          {"authenticate"}
        </button>
      )}
      <Result error={error} />
    </div>
  )
}

export default Keplr
