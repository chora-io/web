'use client'

import { Permissions, ResultTx } from 'chora/components'
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

    if (!wallet) {
      setError('keplr wallet not found')
      return // do not continue
    }

    // set message
    const msg: MsgLeaveGroup = {
      $type: 'cosmos.group.v1.MsgLeaveGroup',
      address: wallet.bech32Address,
      groupId: Long.fromString(groupId.toString() || '0'),
    }

    // convert message to protobuf any message
    const msgAny = {
      typeUrl: '/cosmos.group.v1.MsgLeaveGroup',
      value: MsgLeaveGroup.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet.bech32Address, [msgAny])
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
      <Permissions
        permissions={[
          {
            label: 'group member',
            hasPermission: isMember,
          },
          {
            label: 'authz grantee',
            hasPermission: isAuthz,
          },
        ]}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
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

export default LeaveGroup
