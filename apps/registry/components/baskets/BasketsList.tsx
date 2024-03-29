'use client'

import BasketsListItem from '@components/baskets/BasketsListItem'

const BasketsList = ({ baskets }: any) => {
  return (
    <>
      {baskets &&
        baskets.map((basket: any) => (
          <BasketsListItem key={basket.denom} basket={basket} />
        ))}
    </>
  )
}

export default BasketsList
