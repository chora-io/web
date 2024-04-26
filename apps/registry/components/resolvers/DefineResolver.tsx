'use client'

import { ResultTx } from 'chora/components'
import { MsgDefineResolver as MsgInputs } from 'chora/components/forms/regen.data.v1'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import styles from './DefineResolver.module.css'

const DefineResolver = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  // form inputs
  const [message, setMessage] = useState<any>(null)

  // error and success
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
    <div id="msg-define-resolver" className={styles.box}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs
          network={network}
          message={message}
          setMessage={setMessage}
          useWallet={true}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default DefineResolver
