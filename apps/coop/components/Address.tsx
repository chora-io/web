import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import { useAddressMetadata } from '@hooks/useAddressMetadata'

const Address = ({ address }: { address: string }) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch address metadata (as policy, otherwise member) from network server
  const [metadata, error] = useAddressMetadata(chainInfo, address)

  // TODO: display error?
  if (error) {
    console.error(error)
  }

  return metadata ? (
    <>
      {`${metadata['name']} (`}
      <Link
        href={`/${metadata.isPolicyAddress ? 'policies' : 'members'}/${
          metadata['address']
        }`}
      >
        {metadata['address']}
      </Link>
      {')'}
    </>
  ) : (
    <>{address}</>
  )
}

export default Address
