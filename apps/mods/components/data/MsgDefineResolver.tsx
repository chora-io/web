'use client'

import { WalletContext } from 'chora'
import { ResultTx } from 'chora/components'
import { MsgDefineResolver as MsgInputs } from 'chora/components/data'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import styles from './MsgDefineResolver.module.css'

const MsgDefineResolver = () => {
  const { chainInfo, wallet } = useContext(WalletContext)

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
    <div id="msg-define-resolver" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgDefineResolver'}</h2>
        <p>{'create a data resolver'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs setMessage={setMessage} useWallet={true} wallet={wallet} />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default MsgDefineResolver
