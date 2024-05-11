'use client'

import { ResultTx } from 'chora/components'
import { SelectOptionInput } from 'chora/components/forms'
import {
  MsgAttest as MsgInputs,
  MsgAttestJSON as MsgInputsJSON,
} from 'chora/components/forms/regen.data.v1'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

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

    if (!wallet) {
      setError('keplr wallet not found')
      return // do not continue
    }

    await signAndBroadcast(chainInfo, wallet.bech32Address, [message])
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
      <SelectOptionInput input={input} setInput={handleSetInput} />
      {input == 'form' ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <MsgInputs setMessage={setMessage} useWallet={true} wallet={wallet} />
          <hr />
          <button type="submit">{'submit'}</button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <MsgInputsJSON
            setMessage={setMessage}
            useWallet={true}
            wallet={wallet}
          />
          <hr />
          <button type="submit">{'submit'}</button>
        </form>
      )}
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default MsgAttest
