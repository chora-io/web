'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { ResultTx } from 'chora/components'
import { MsgCreateBatch as MsgInputs } from 'chora/components/ecocredit'
import { signAndBroadcast } from 'chora/utils'

import styles from './MsgCreateBatch.module.css'

const MsgCreateBatch = () => {
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
    <div id="msg-create-batch" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgCreateBatch'}</h2>
        <p>{'create a credit batch'}</p>
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

export default MsgCreateBatch
