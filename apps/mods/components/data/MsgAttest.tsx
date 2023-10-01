'use client'

import { WalletContext } from 'chora'
import { ResultTx } from 'chora/components'
import {
  MsgAttest as MsgInputs,
  MsgAttestJSON as MsgInputsJSON,
} from 'chora/components/data'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import SelectInput from '@components/SelectInput'

import styles from './MsgAttest.module.css'

const MsgAttest = () => {
  const { chainInfo, wallet } = useContext(WalletContext)

  const [input, setInput] = useState('form')
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

  const handleSetInput = (input: string) => {
    setInput(input)
    setError(null)
    setSuccess(null)
  }

  return (
    <div id="msg-attest" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgAttest'}</h2>
        <p>{'attest to data'}</p>
      </div>
      <SelectInput input={input} setInput={handleSetInput} />
      {input == 'form' ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <MsgInputs setMessage={setMessage} useWallet={true} wallet={wallet} />
          <button type="submit">{'submit'}</button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <MsgInputsJSON
            setMessage={setMessage}
            useWallet={true}
            wallet={wallet}
          />
          <button type="submit">{'submit'}</button>
        </form>
      )}
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default MsgAttest
