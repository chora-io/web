'use client'

import { Vouchers } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { useVouchers } from '@hooks/useVouchers'

const VouchersContainer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch vouchers from selected network
  const [vouchers, error] = useVouchers(chainInfo, limit, offset)

  const renderLink = (voucherId: string) => (
    <Link href={`/${network}/vouchers/${voucherId}`}>{'view voucher'}</Link>
  )

  return (
    <Vouchers
      vouchers={vouchers}
      error={error}
      renderLink={renderLink}
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      view={view}
      setView={setView}
    />
  )
}

export default VouchersContainer
