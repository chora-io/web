'use client'

import { Classes } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupClasses } from '@hooks/useGroupClasses'

const ClassesContainer = () => {
  const { groupId } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // TODO: limit, offset, setOffset, view, setView

  // fetch credit classes administered by group from selected network
  const [classes, classesError] = useGroupClasses(chainInfo, policies)

  const error = policiesError || classesError

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (denom: string) => (
    <Link href={`/${network}/${groupId}/classes/${denom}`}>{'view class'}</Link>
  )

  return (
    <Classes
      classes={classes}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default ClassesContainer
