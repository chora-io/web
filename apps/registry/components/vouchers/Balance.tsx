'use client'

import { VoucherBalance } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useVoucherBalance } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const Balance = () => {
  const { id, address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch voucher balance by voucher id and address from selected network
  const [balance, error] = useVoucherBalance(chainInfo, `${id}`, `${address}`)

  return <VoucherBalance balance={balance} error={error} />
}

export default Balance
