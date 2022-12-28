import * as React from "react"

import * as styles from "./ResultTx.module.css"

const queryTx = "cosmos/tx/v1beta1/txs"

const ResultTx = ({ error, rest, success }: any) => {
  const txUrl = rest + "/" + queryTx + "/" + success
  return (
    <>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {success != "" && (
        <div>
          <a href={txUrl}>
            {txUrl}
          </a>
        </div>
      )}
    </>
  )
}

export default ResultTx
