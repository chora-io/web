'use client'

import { ResultTx } from 'chora/components'
import { MsgDefineResolver as MsgInputs } from 'chora/components/forms/regen.data.v1'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import { usePermissions } from '@hooks/usePermissions'

import styles from './DefineResolver.module.css'

const DefineResolver = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [isAuthz] = usePermissions(
    wallet,
    '/regen.ecocredit.v1.MsgCreateProject',
  )

  // form inputs
  const [message, setMessage] = useState<any>(null)

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    await signAndBroadcast(chainInfo, wallet['bech32Address'], [message])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="msg-define-resolver" className={styles.box}>
      <div className={styles.boxOptions}>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{'✓'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'new manager'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAuthz ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'authz grantee'}</span>
        </span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs
          network={network}
          message={message}
          setMessage={setMessage}
          useWallet={true}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default DefineResolver
