'use client'

import { Voucher } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useVoucher } from '@hooks/useVoucher'

const VoucherContainer = () => {
  const { id } = useParams()
  const { chainInfo, network } = useContext(WalletContext)

  // fetch voucher from selected network
  const [voucher, voucherError] = useVoucher(chainInfo, `${id}`)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    voucher ? voucher.metadata : null,
  )

  const error = voucherError || metadataError

  const renderMetadata = (metadata: string) => (
    <Link href={`/${network}/claims/${metadata}`}>{metadata}</Link>
  )

  return (
    <Voucher
      voucher={voucher}
      metadata={metadata}
      error={error}
      renderMetadata={renderMetadata}
    />
  )
}

export default VoucherContainer
