import * as React from 'react'

import styles from './ResultTx.module.css'

const queryTx = 'cosmos/tx/v1beta1/txs'

const ResultTx = ({ error, rest, success }: any) => {
  const txUrl = rest + '/' + queryTx + '/' + success
  return error || success ? (
    <div className={styles.boxText}>
      {error && <pre className={styles.error}>{error}</pre>}
      {success && (
        <pre>
          <a href={txUrl}>{txUrl}</a>
        </pre>
      )}
    </div>
  ) : (
    <></>
  )
}

export default ResultTx
