import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { signAndBroadcast } from "chora/utils/tx"

import { MsgCreate } from "../../../api/chora/geonode/v1/msg"

import InputMetadata from "../InputMetadata"
import ResultTx from "../ResultTx"

import * as styles from "./MsgCreate.module.css"

const MsgCreateView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [metadata, setMetadata] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg = {
      $type: "chora.geonode.v1.MsgCreate",
      curator: wallet.bech32Address,
      metadata: metadata,
    } as MsgCreate

    const encMsg = MsgCreate.encode(msg).finish()

    await signAndBroadcast(chainInfo, wallet.bech32Address, msg, encMsg)
      .then(res => {
        setSuccess(res)
      }).catch(err => {
        setError(err.message)
      })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputMetadata
            metadata={metadata}
            setMetadata={setMetadata}
          />
          <button type="submit">
            {"submit"}
          </button>
        </form>
      </div>
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </>
  )
}

export default MsgCreateView
