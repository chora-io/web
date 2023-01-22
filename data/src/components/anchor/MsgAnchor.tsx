import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { signAndBroadcast } from "chora/utils/tx"

import MsgInputs from "chora/components/data/MsgAnchor"
import MsgInputsJSON from "chora/components/data/MsgAnchorJSON"
import ResultTx from "chora/components/ResultTx"

import SelectInput from "../SelectInput"

import * as styles from "./MsgAnchor.module.css"

const MsgAnchor = () => {

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
    <>
      <SelectInput
        input={input}
        setInput={handleSetInput}
      />
      <div>
        {input === "form" ? (
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
      </div>
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </>
  )
}

export default MsgAnchor
