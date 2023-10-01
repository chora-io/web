'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './Transaction.module.css'

const queryTx = 'cosmos/tx/v1beta1/txs'

const Transaction = ({ rest }: any) => {
  const { hash } = useParams()

  const [error, setError] = useState<string | undefined>(undefined)
  const [response, setResponse] = useState<any>(undefined)

  useEffect(() => {
    fetch(rest + '/' + queryTx + '/' + hash)
      .then((res) => res.json())
      .then((data) => {
        setResponse(data)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [rest, hash, response])

  return (
    <div>
      <div className={styles.box}>
        <div>
          <h2>{'transaction'}</h2>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default Transaction
