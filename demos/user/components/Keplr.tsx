'use client'

import { Result } from 'chora/components'
import { ServerContext, WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import { useContext, useState } from 'react'

import styles from './Keplr.module.css'

const Keplr = () => {
  const { account, activeAccount, setAccount } = useContext(ServerContext)
  const { chainInfo, wallet } = useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // authentication error
  const [error, setError] = useState<string | null>(null)

  // authenticate user with keplr wallet
  const handleSubmit = async () => {
    // reset authentication error
    setError(null)

    if (!wallet) {
      setError('keplr wallet not detected')
      return
    }

    // TODO: data to sign
    const data = new Uint8Array(1)

    // signature for authentication
    let signature: any

    // sign data and set signature
    await window?.keplr
      ?.signArbitrary(chainInfo.chainId, wallet.bech32Address, data)
      .then((res) => {
        signature = res.signature
      })
      .catch((err) => {
        setError(err.message)
      })

    // new authentication request
    await fetch(serverUrl + '/auth/keplr', {
      method: 'POST',
      body: JSON.stringify({
        token: activeAccount ? activeAccount.token : undefined,
        address: wallet.bech32Address,
        signature,
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
        <h2>{'keplr authentication'}</h2>
        <p>{'authenticate user with keplr wallet'}</p>
      </div>
      {wallet ? (
        <div className={styles.boxItem}>
          <div className={styles.boxText}>
            <h3>{'connected'}</h3>
            <p>{account && account.address ? 'true' : 'false'}</p>
          </div>
          <div className={styles.boxText}>
            <h3>{'address'}</h3>
            <p>{(account && account.address) || wallet.bech32Address}</p>
          </div>
        </div>
      ) : (
        <div className={styles.boxItem}>
          <p>{'keplr wallet not detected, unable to authenticate'}</p>
        </div>
      )}
      {(!account || (account && !account.address)) && (
        <button className={styles.button} onClick={handleSubmit}>
          {'authenticate'}
        </button>
      )}
      <Result error={error} />
    </div>
  )
}

export default Keplr
