'use client'

import { WalletContext } from 'chora'
import { ResultTx } from 'chora/components'
import { MsgUpdateGroupPolicyAdmin as MsgInputs } from 'chora/components/group'
import { signAndBroadcast } from 'chora/utils'
import { useContext, useState } from 'react'

import styles from './MsgUpdateGroupPolicyAdmin.module.css'

const MsgUpdateGroupPolicyAdmin = () => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [message, setMessage] = useState<any>(null)
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
    <div id="msg-update-group-policy-admin" className={styles.box}>
      <div className={styles.boxHeader}>
        <h2>{'MsgUpdateGroupPolicyAdmin'}</h2>
        <p>{'update the admin of a group policy'}</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <MsgInputs
          network={network}
          setMessage={setMessage}
          useWallet={true}
          wallet={wallet}
        />
        <button type="submit">{'submit'}</button>
      </form>
      <ResultTx error={error} rest={chainInfo?.rest} success={success} />
    </div>
  )
}

export default MsgUpdateGroupPolicyAdmin
