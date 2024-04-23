'use client'

import { InputString, Result } from 'chora/components'
import { ServerContext, WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import { useContext, useState } from 'react'

import styles from './Login.module.css'

const Login = () => {
  const { account, activeAccount, setAccount } = useContext(ServerContext)
  const { chainInfo } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // form inputs
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  // authentication error
  const [error, setError] = useState<string | null>(null)

  // authenticate user with username and password
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    // reset authentication error
    setError(null)

    // authenticate user with username and password
    await fetch(serverUrl + '/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        token: activeAccount ? activeAccount.token : undefined,
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setError(data.message)
        } else if (data.error) {
          setError(data.error)
        } else {
          setAccount(data.user, data.token)
        }
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'username and password authentication'}</h2>
        <p>{'authenticate user with username and password'}</p>
      </div>
      <div className={styles.boxItem}>
        <div className={styles.boxText}>
          <h3>{'connected'}</h3>
          <p>{account && account.username ? 'true' : 'false'}</p>
        </div>
        {!account || (account && !account.username) ? (
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
              setString={setPassword}
              disabled // TODO: password input
            />
            <button className={styles.button} type="submit">
              {'authenticate'}
            </button>
          </form>
        ) : (
          <div className={styles.boxText}>
            <h3>{'username'}</h3>
            <p>{account && account.username}</p>
          </div>
        )}
      </div>
      <Result error={error} />
    </div>
  )
}

export default Login
