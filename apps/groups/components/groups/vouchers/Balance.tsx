'use client'

import { VoucherBalance } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useVoucherBalance } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const Balance = () => {
  const { id, address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch voucher balance by voucher id and address from selected network
  const [balance, error] = useVoucherBalance(chainInfo, `${id}`, `${address}`)

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <VoucherBalance
      balance={balance}
      error={error}
      renderAddress={renderAddress}
    />
  )
}

export default Balance
