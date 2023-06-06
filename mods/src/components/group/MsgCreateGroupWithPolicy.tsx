import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { ResultTx } from "chora/components"
import { MsgCreateGroupWithPolicy as MsgInputs } from "chora/components/group"
import { signAndBroadcast } from "chora/utils"

import * as styles from "./MsgCreateGroupWithPolicy.module.css"

const MsgCreateGroupWithPolicy = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

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

  return (
    <div id="msg-create-group-with-policy" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>
          {"MsgCreateGroupWithPolicy"}
        </h2>
        <p>
          {"create a group with a group policy"}
        </p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs
          network={network}
          setMessage={setMessage}
          useWallet={true}
          wallet={wallet}
        />
        <button type="submit">
          {"submit"}
        </button>
      </form>
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default MsgCreateGroupWithPolicy
