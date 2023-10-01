'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import styles from './Account.module.css'

const queryAccount = '/cosmos/auth/v1beta1/account'

const Account = ({ rest }: any) => {
  const { address } = useParams()

  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<any>(null)

  useEffect(() => {
    fetch(rest + '/' + queryAccount + '/' + address)
      .then((res) => res.json())
      .then((data) => {
        setResponse(data)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [rest, address, response])

  return (
    <div>
      <div className={styles.box}>
        <div>
          <h2>{'account'}</h2>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  )
}

export default Account
