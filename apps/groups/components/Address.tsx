import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { GroupContext } from '@contexts/GroupContext'

const Address = ({ address }: { address: string }) => {
  const { groupId } = useParams()
  const { policies, policiesError, members, membersError } =
    useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  let isPolicyAddress = false
  let unresolvedMetadata = ''

  const policy = policies?.find((p: any) => p.address === address)
  const member = members?.find((m: any) => m.member.address === address)

  if (policy) {
    isPolicyAddress = true
    unresolvedMetadata = policy.metadata
  } else if (member) {
    unresolvedMetadata = member.member.metadata
  }

  // fetch metadata from network server
  const [metadata, metadataError] = useMetadata(chainInfo, unresolvedMetadata)

  // TODO: handle error
  if (policiesError || membersError || metadataError) {
    console.error(policiesError || membersError || metadataError)
  }

  return metadata ? (
    <>
      {`${metadata['name']} (`}
      <Link
        href={`${isPolicyAddress ? `/${network}/${groupId}/accounts` : `/${network}/${groupId}/members`}/${address}`}
      >
        {address}
      </Link>
      {')'}
    </>
  ) : (
    <>{address}</>
  )
}

export default Address
