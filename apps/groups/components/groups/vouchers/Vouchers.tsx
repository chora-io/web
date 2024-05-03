'use client'

import { Vouchers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupVouchers } from '@hooks/useGroupVouchers'

const VouchersContainer = () => {
  const { groupId } = useParams()

  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo, network } = useContext(WalletContext)

  // fetch vouchers issued by group from selected network
  const [vouchers, vouchersError] = useGroupVouchers(chainInfo, policies)

  const error = policiesError || vouchersError

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (id: string) => (
    <Link href={`/${network}/${groupId}/vouchers/${id}`}>{'view voucher'}</Link>
  )

  return (
    <Vouchers
      vouchers={vouchers}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default VouchersContainer
