import * as React from "react"
import { useContext, useState } from "react"

import { WalletContext } from "chora"
import { signAndBroadcast } from "chora/utils/tx"
import InputURL from "chora/components/InputURL"
import ResultTx from "chora/components/ResultTx"

import { MsgDefineResolver } from "../../../api/regen/data/v1/tx"

import * as styles from "./MsgDefineResolver.module.css"

const MsgDefineResolverView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [url, setUrl] = useState<string>("")

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const msg: MsgDefineResolver = {
      $type: "regen.data.v1.MsgDefineResolver",
      manager: wallet.bech32Address,
      resolverUrl: url,
    }

    const encMsg = MsgDefineResolver.encode(msg).finish()

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
          <InputURL
            id="resolver-url"
            label="resolver url"
            placeholder="https://server.chora.io"
            url={url}
            setUrl={setUrl}
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

export default MsgDefineResolverView
