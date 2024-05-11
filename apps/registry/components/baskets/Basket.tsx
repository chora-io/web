'use client'

import { Basket } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import { useBasket } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

const BasketContainer = () => {
  const { denom } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch credit basket from selected network
  const [basket, error] = useBasket(chainInfo, denom.toString())

  return <Basket basket={basket} error={error} />
}

export default BasketContainer
