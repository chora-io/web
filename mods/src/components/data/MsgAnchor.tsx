import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { ResultTx } from "chora/components"
import {
  MsgAnchor as MsgInputs,
  MsgAnchorJSON as MsgInputsJSON,
} from "chora/components/data"
import { signAndBroadcast } from "chora/utils"

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
    <div id="msg-anchor" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"MsgAnchor"}
        </h2>
        <p>
          {"anchor data"}
        </p>
      </div>
      <SelectInput
        input={input}
        setInput={handleSetInput}
      />
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
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default MsgAnchor
