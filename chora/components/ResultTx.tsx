import * as React from "react"

import * as styles from "./ResultTx.module.css"

const queryTx = "cosmos/tx/v1beta1/txs"

const ResultTx = ({ error, rest, success }: any) => {
  const txUrl = rest + "/" + queryTx + "/" + success
  return (
    <>
      {error && (
        <div>
          <pre className={styles.error}>
            {error}
          </pre>
        </div>
      )}
      {success && (
        <div>
          <pre>
            <a href={txUrl}>
              {txUrl}
            </a>
          </pre>
        </div>
      )}
    </>
  )
}

export default ResultTx
