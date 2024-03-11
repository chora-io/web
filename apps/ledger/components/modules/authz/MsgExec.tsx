'use client'

import { ResultTx } from 'chora/components'
import { MsgExec as MsgInputs } from 'chora/components/authz'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import styles from './MsgExec.module.css'

const MsgExec = () => {
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
    <div id="msg-exec" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgExec'}</h2>
        <p>{'execute authorized messages'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs setMessage={setMessage} useWallet={true} wallet={wallet} />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default MsgExec
