import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { signAndBroadcast } from "chora/utils/tx"

import MsgInputs from "chora/components/data/MsgRegisterResolver"
import MsgInputsJSON from "chora/components/data/MsgRegisterResolverJSON"
import ResultTx from "chora/components/ResultTx"

import SelectInput from "../../SelectInput"

import * as styles from "./MsgRegisterResolver.module.css"

const MsgRegisterResolverView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  const [input, setInput] = useState("form")
  const [message, setMessage] = useState<any>(undefined)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    await signAndBroadcast(chainInfo, wallet["bech32Address"], [message])
      .then(res => {
        setSuccess(res)
      }).catch(err => {
        setError(err.message)
      })
  }

  const handleSetInput = (input) => {
    setInput(input)
    setError("")
    setSuccess("")
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"MsgRegisterResolver"}
        </h2>
        <p>
          {"register data to a data resolver"}
        </p>
      </div>
      <SelectInput
        input={input}
        setInput={handleSetInput}
      />
      {input == "form" ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <MsgInputs
            setMessage={setMessage}
            useWallet={true}
            wallet={wallet}
          />
          <button type="submit">
            {"submit"}
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <MsgInputsJSON
            setMessage={setMessage}
            useWallet={true}
            wallet={wallet}
          />
          <button type="submit">
            {"submit"}
          </button>
        </form>
      )}
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default MsgRegisterResolverView