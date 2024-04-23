'use client'

import { ResultTx } from 'chora/components'
import { InputAddress } from 'chora/components/forms'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { MsgUpdateGroupPolicyAdmin } from 'cosmos/api/cosmos/group/v1/tx'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

import { useAdminPermissions } from '@hooks/useAdminPermissions'

import styles from './UpdateAccountAdmin.module.css'

const UpdateAccountAdmin = () => {
  const { address } = useParams()
  const { chainInfo, network, wallet } = useContext(WalletContext)

  const [isAdmin, isPolicy, isAuthz] = useAdminPermissions(
    wallet,
    '/cosmos.group.v1.MsgUpdateGroupPolicyAdmin',
  )

  // form inputs
  const [newAdmin, setNewAdmin] = useState<string>('')

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    // set message
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
      <div className={styles.boxOptions}>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAdmin ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'admin account'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isPolicy ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'policy + member'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAuthz ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'authz grantee'}</span>
        </span>
      </div>
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
      <div className={styles.boxText}>
        <ResultTx error={error} rest={chainInfo?.rest} success={success} />
      </div>
    </div>
  )
}

export default UpdateAccountAdmin
