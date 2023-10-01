'use client'

import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { ResultTx } from 'chora/components'
import { MsgCreate as MsgInputs } from 'chora/components/voucher'
import { signAndBroadcast } from 'chora/utils'

import styles from './MsgCreate.module.css'

const MsgCreate = () => {
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
    <div id="msg-create" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgCreate'}</h2>
        <p>{'create a voucher'}</p>
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

export default MsgCreate
