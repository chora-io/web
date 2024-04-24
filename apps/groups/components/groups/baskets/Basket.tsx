'use client'

import { Basket } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useBasket } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

const BasketContainer = () => {
  const { denom } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch credit basket from selected network
  const [basket, error] = useBasket(chainInfo, `${denom}`)

  const renderAddress = (address) => <Address address={address} />

  return <Basket basket={basket} error={error} renderAddress={renderAddress} />
}

export default BasketContainer
