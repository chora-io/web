import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { subAddress } from 'chora/utils'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { GroupContext } from '@contexts/GroupContext'

const Address = ({ address }: { address: string }) => {
  const { groupId } = useParams()
  const { policies, policiesError, members, membersError } =
    useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // error fetching initial parameters
  const initError = policiesError || membersError

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
  if (initError || metadataError) {
    console.error(initError || metadataError)
  }

  return metadata ? (
    <>
      {`${metadata['name']} (`}
      <Link
        href={`${isPolicyAddress ? `/${network}/${groupId}/accounts` : `/${network}/${groupId}/members`}/${address}`}
      >
        {subAddress(address)}
      </Link>
      {')'}
    </>
  ) : (
    <>{address}</>
  )
}

export default Address
