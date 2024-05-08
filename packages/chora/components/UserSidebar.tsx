'use client'

import { Result } from 'chora/components'
import { SelectNetwork } from 'chora/components/forms'
import { ServerContext, MenuContext, WalletContext } from 'chora/contexts'
import { useNetworkServer } from 'chora/hooks'
import * as React from 'react'
import { useContext, useState } from 'react'

import styles from './UserSidebar.module.css'

const UserSidebar = () => {
  const { account, activeAccount, removeAccount, setAccount } =
    useContext(ServerContext)
  const {
    chainInfo,
    getKeplr,
    network,
    setNetwork,
    wallet,
    error: keplrError,
  } = useContext(WalletContext)
  const { showUser } = useContext(MenuContext)

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

    // TODO: application data for arbitrary signing
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

  // disconnect active account
  const handleDisconnect = () => {
    // TODO: black list JWT token on chora server ?
    // TODO: implement server-side session tokens ?

    // remove account from local storage
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

  return (
    <div className={showUser ? styles.sidebar : styles.hidden}>
      {wallet ? (
        <div>
          <p>
            <i>{'keplr wallet network'}</i>
          </p>
          <p>{network && network}</p>
          <p>
            <i>{'keplr wallet account address'}</i>
          </p>
          <p>{wallet && wallet.bech32Address}</p>
        </div>
      ) : (
        <div>
          <p>
            <i>{'connect to keplr wallet to access additional features'}</i>
          </p>
          <p>{'keplr wallet will connect to the following network:'}</p>
          <p>{network}</p>
          <div>
            <button className={styles.button} onClick={getKeplr}>
              {'connect'}
            </button>
          </div>
          {keplrError && <p className={styles.error}>{keplrError}</p>}
        </div>
      )}
      <hr />
      {account ? (
        <div>
          <p>
            <i>{'chora server account id'}</i>
          </p>
          <p>{account && account.id}</p>
          <p>
            <i>{'chora server account address'}</i>
          </p>
          <p>{account && account.address}</p>
          <div>
            {switched && (
              <button className={styles.button} onClick={handleSwitchBack}>
                {'switch back'}
              </button>
            )}
            <button className={styles.button} onClick={handleDisconnect}>
              {'disconnect'}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>
            <i>{'connect to chora server to access additional features'}</i>
          </p>
          {wallet ? (
            wallet.bech32Address.includes('chora') ? (
              <>
                <div>
                  <p>
                    {'The following address will be used for authentication:'}
                  </p>
                  <p>{wallet.bech32Address}</p>
                </div>
                <button className={styles.button} onClick={handleAuthenticate}>
                  {'authenticate'}
                </button>
              </>
            ) : (
              <div>
                <p>{'Switch to chora testnet to connect to chora server.'}</p>
                <form className={styles.form}>
                  <SelectNetwork
                    label=" "
                    network={network}
                    setNetwork={handleSetNetwork}
                  />
                </form>
              </div>
            )
          ) : (
            <div>
              <p>{'authentication requires keplr wallet to be connected'}</p>
            </div>
          )}
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default UserSidebar
