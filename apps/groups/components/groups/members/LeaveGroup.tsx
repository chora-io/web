'use client'

import { ResultTx } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { signAndBroadcast } from 'chora/utils'
import { MsgLeaveGroup } from 'cosmos/api/cosmos/group/v1/tx'
import * as Long from 'long'
import { useParams } from 'next/navigation'
import { useContext, useState } from 'react'

import { usePermissionsMember } from '@hooks/usePermissionsMember'

import styles from './LeaveGroup.module.css'

const LeaveGroup = () => {
  const { groupId } = useParams()
  const { chainInfo, wallet } = useContext(WalletContext)

  const [isMember, isAuthz, permError] = usePermissionsMember(
    wallet,
    '/cosmos.group.v1.MsgLeaveGroup',
  )

  // error fetching initial parameters
  const initError = permError

  // error and success
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<any>(null)

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError(null)
    setSuccess(null)

    // set message
    const msg = {
      $type: 'cosmos.group.v1.MsgLeaveGroup',
      address: wallet['bech32Address'],
      groupId: Long.fromString(`${groupId}` || '0'),
    } as unknown as MsgLeaveGroup

    // convert message to any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgLeaveGroup',
      value: MsgLeaveGroup.encode(msg).finish(),
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
          <b>{isMember ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'group member'}</span>
        </span>
        <span style={{ fontSize: '0.9em', marginRight: '1.5em', opacity: 0.5 }}>
          <b>{isAuthz ? '✓' : 'x'}</b>
          <span style={{ marginLeft: '0.5em' }}>{'authz grantee'}</span>
        </span>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit">{'submit'}</button>
      </form>
      <div className={styles.boxText}>
        <ResultTx
          error={error || initError}
          rest={chainInfo?.rest}
          success={success}
        />
      </div>
    </div>
  )
}

export default LeaveGroup
