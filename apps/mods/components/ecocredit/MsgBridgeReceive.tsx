'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { ResultTx } from 'chora/components'
import { MsgBridgeReceive as MsgInputs } from 'chora/components/ecocredit'
import { signAndBroadcast } from 'chora/utils'

import styles from './MsgBridgeReceive.module.css'

const MsgBridgeReceive = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [message, setMessage] = useState<any>(undefined)
  const [error, setError] = useState<string | undefined>(undefined)
  const [success, setSuccess] = useState<string | undefined>(undefined)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(undefined)
    setSuccess(undefined)

    await signAndBroadcast(chainInfo, wallet['bech32Address'], [message])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="msg-bridge-receive" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgBridgeReceive'}</h2>
        <p>{'receive bridge credits'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs
          network={network}
          setMessage={setMessage}
          useWallet={true}
          wallet={wallet}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default MsgBridgeReceive
