'use client'

import { InputAddress, ResultTx } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { MsgUpdateGroupPolicyAdmin } from 'cosmos/api/cosmos/group/v1/tx'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

import styles from './UpdateAccountAdmin.module.css'

const UpdateAccountAdmin = () => {
  const { address } = useParams()
  const { chainInfo, network, wallet } = useContext(WalletContext)

  // form input
  const [newAdmin, setNewAdmin] = useState<string>('')

  // fetch and form error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  // submit group
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    // set submit group message
    const msg = {
      $type: 'cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
      admin: wallet['bech32Address'],
      groupPolicyAddress: `${address}`,
      newAdmin: newAdmin,
    } as unknown as MsgUpdateGroupPolicyAdmin

    // convert message to any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
      value: MsgUpdateGroupPolicyAdmin.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet['bech32Address'], [msgAny])
      .then((res) => {
        setSuccess(res)
      })
      .catch((err) => {
        if (err.message === "Cannot read properties of null (reading 'key')") {
          setError('keplr account does not exist on the selected network')
        } else {
          setError(err.message)
        }
      })
  }

  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <InputAddress
          id="account-admin"
          label="account admin"
          network={network}
          address={newAdmin}
          setAddress={setNewAdmin}
        />
        <button type="submit">{'submit'}</button>
      </form>
      {(success || error) && (
        <div className={styles.boxResultBelow}>
          <ResultTx error={error} rest={chainInfo?.rest} success={success} />
        </div>
      )}
    </div>
  )
}

export default UpdateAccountAdmin
