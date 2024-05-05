'use client'

import { Permissions, ResultTx } from 'chora/components'
import { MsgDefineResolver as MsgInputs } from 'chora/components/forms/regen.data.v1'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import { usePermissions } from '@hooks/usePermissions'

import styles from './DefineResolver.module.css'

const DefineResolver = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [isAuthz, permError] = usePermissions(
    wallet,
    '/regen.ecocredit.v1.MsgCreateProject',
  )

  // error fetching initial parameters
  const initError = permError

  // form inputs
  const [message, setMessage] = useState<any>(null)

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    if (!wallet) {
      setError('keplr wallet not found')
      return // do not continue
    }

    await signAndBroadcast(chainInfo, wallet.bech32Address, [message])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        setError(err.message)
      })
  }

  return (
    <div id="msg-define-resolver" className={styles.box}>
      <Permissions
        permissions={[
          {
            label: 'new manager',
            hasPermission: true,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs
          network={network}
          message={message}
          setMessage={setMessage}
          useWallet={true}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx
        error={initError || error}
        rest={chainInfo?.rest}
        success={success}
      />
    </div>
  )
}

export default DefineResolver
