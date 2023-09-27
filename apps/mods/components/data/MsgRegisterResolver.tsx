import { useContext, useState } from 'react'

import { WalletContext } from 'chora'
import { ResultTx } from 'chora/components'
import {
  MsgRegisterResolver as MsgInputs,
  MsgRegisterResolverJSON as MsgInputsJSON,
} from 'chora/components/data'
import { signAndBroadcast } from 'chora/utils'

import SelectInput from '../SelectInput'

import styles from './MsgRegisterResolver.module.css'

const MsgRegisterResolverView = () => {
  const { chainInfo, wallet } = useContext(WalletContext)

  const [input, setInput] = useState('form')
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

  const handleSetInput = (input: string) => {
    setInput(input)
    setError(undefined)
    setSuccess(undefined)
  }

  return (
    <div id="msg-register-resolver" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgRegisterResolver'}</h2>
        <p>{'register data to a data resolver'}</p>
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

export default MsgRegisterResolverView
