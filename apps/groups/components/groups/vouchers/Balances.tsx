'use client'

import { VoucherBalances } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useVoucherBalances } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const Balances = () => {
  const { id, groupId } = useParams()

  const { chainInfo, network } = useContext(WalletContext)

  // fetch voucher balances from selected network
  const [balances, error] = useVoucherBalances(chainInfo, id.toString())

  const renderAddress = (address: string) => <Address address={address} />

  const renderLink = (address: string) => (
    <Link href={`/${network}/${groupId}/vouchers/${id}/${address}`}>
      {'view balance'}
    </Link>
  )

  return (
    <VoucherBalances
      balances={balances}
      error={error}
      renderAddress={renderAddress}
      renderLink={renderLink}
    />
  )
}

export default Balances
