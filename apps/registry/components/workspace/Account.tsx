'use client'

import { Result, SelectNetwork } from 'chora/components'
import { AuthContext, WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import { useContext, useState } from 'react'

import styles from './Account.module.css'

const Account = () => {
  const { account, activeAccount, removeAccount, setAccount } =
    useContext(AuthContext)
  const { chainInfo, network, selected, setNetwork, wallet } =
    useContext(WalletContext)

  const [serverUrl] = useNetworkServer(chainInfo)

  // authentication error
  const [error, setError] = useState<string | null>(null)

  // switched from network
  const [switched, setSwitched] = useState<string | null>(null)

  // authenticate user with keplr wallet
  const handleAuthenticate = async () => {
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

  // remove account from local storage
  const handleDisconnect = () => {
    // TODO: disconnect from chora server

    removeAccount(activeAccount)
  }

  // set switch when switching networks
  const handleSetNetwork = (value: any) => {
    setSwitched(network)
    setNetwork(value)
  }

  // switch back network and clear switched
  const handleSwitchBack = () => {
    setNetwork(switched)
    setSwitched(null)
  }

  if (!account) {
    return (
      <div className={styles.box}>
        <div className={styles.boxHeader}>
          <h2>{'Account Required'}</h2>
          <p>{'workspace requires an account on chora server'}</p>
        </div>
        {wallet ? (
          wallet.bech32Address.includes('chora') ? (
            <>
              <div className={styles.boxText}>
                <p>
                  {'The following address will be used for authentication:'}
                </p>
                <p style={{ marginTop: '0.5em' }}>{wallet.bech32Address}</p>
              </div>
              <div className={styles.boxText}>
                <button className={styles.button} onClick={handleAuthenticate}>
                  {'authenticate'}
                </button>
              </div>
            </>
          ) : (
            <div className={styles.boxText}>
              <p>
                {'Switch networks to authenticate with your chora address.'}
              </p>
              <form className={styles.form}>
                <SelectNetwork
                  label=" "
                  network={network}
                  selected={selected}
                  setNetwork={handleSetNetwork}
                />
              </form>
            </div>
          )
        ) : (
          <div className={styles.boxText}>
            <p>{'authentication requires keplr wallet to be connected'}</p>
          </div>
        )}
        <Result error={error} />
      </div>
    )
  }

  return (
    <>
      {switched && (
        <div className={styles.box}>
          <div className={styles.boxHeader}>
            <h2>{'Switch Back'}</h2>
            <p>{`switch back to ${switched}`}</p>
          </div>
          <div className={styles.boxText}>
            <button className={styles.button} onClick={handleSwitchBack}>
              {'switch back'}
            </button>
          </div>
        </div>
      )}
      <div className={styles.box}>
        <div className={styles.boxHeader}>
          <h2>{'Account Information'}</h2>
          <p>{'account information stored on chora server'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'id'}</h3>
          <p>{(account && account.id) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'address'}</h3>
          <p>{(account && account.address) || 'NA'}</p>
          {wallet && account.address !== wallet.bech32Address && (
            <p style={{ fontSize: '0.9em' }}>
              <i>
                {
                  "Note: Address does not match active keplr account and that's ok."
                }
              </i>
            </p>
          )}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxHeader}>
          <h2>{'Disconnect Account'}</h2>
          <p>{'clear authentication and disconnect from chora server'}</p>
        </div>
        <div className={styles.boxText}>
          <button className={styles.button} onClick={handleDisconnect}>
            {'disconnect'}
          </button>
        </div>
      </div>
    </>
  )
}

export default Account
