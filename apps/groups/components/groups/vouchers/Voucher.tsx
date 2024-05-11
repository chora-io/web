'use client'

import { Voucher } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata, useVoucher } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const VoucherContainer = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch voucher from selected network
  const [voucher, voucherError] = useVoucher(chainInfo, id.toString())

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    voucher ? voucher.metadata : null,
  )

  const error = voucherError || metadataError

  const renderAddress = (address: string) => <Address address={address} />

  return (
    <Voucher
      voucher={voucher}
      metadata={metadata}
      error={error}
      renderAddress={renderAddress}
    />
  )
}

export default VoucherContainer
