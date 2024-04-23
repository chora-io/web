'use client'

import { ResultTx } from 'chora/components'
import { MsgRemoveAllowedBridgeChain as MsgInputs } from 'chora/components/forms/regen.ecocredit.v1'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import styles from './MsgRemoveAllowedBridgeChain.module.css'

const MsgRemoveAllowedBridgeChain = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [message, setMessage] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    await signAndBroadcast(chainInfo, wallet['bech32Address'], [message])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="msg-remove-allowed-bridge-chain" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgRemoveAllowedBridgeChain'}</h2>
        <p>{'remove a chain from the bridge allowlist'}</p>
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

export default MsgRemoveAllowedBridgeChain
