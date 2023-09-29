import * as React from 'react'
import { useEffect, useState } from 'react'

import { Coin } from 'cosmos/api/cosmos/base/v1beta1/coin'
import { BasicAllowance } from 'cosmos/api/cosmos/feegrant/v1beta1/feegrant'

import InputDenom from '../InputDenom'
import InputNumber from '../InputNumber'
import InputTimestamp from '../InputTimestamp'

const defaultId = 'allowance'
const defaultLabel = 'allowance'

const InputAllowance = ({ id, label, network, setAllowance }: any) => {
  const [denom, setDenom] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [expiration, setExpiration] = useState<string>('')

  useEffect(() => {
    const c = {
      $type: 'cosmos.base.v1beta1.Coin',
      denom: denom,
      amount: amount,
    } as Coin

    const a = {
      typeUrl: '/cosmos.feegrant.v1beta1.BasicAllowance',
      value: BasicAllowance.encode({
        $type: 'cosmos.feegrant.v1beta1.BasicAllowance',
        spendLimit: [c],
        expiration: new Date(expiration),
      }).finish(),
    }

    setAllowance(a)
  }, [denom, amount, expiration])

  return (
    <>
      <InputDenom
        id={(id || defaultId) + '-spend-limit-denom'}
        label={(label || defaultLabel) + ' spend limit denom'}
        network={network}
        denom={denom}
        setDenom={setDenom}
      />
      <InputNumber
        id={(id || defaultId) + '-spend-limit-amount'}
        label={(label || defaultLabel) + ' spend limit amount'}
        number={amount}
        setNumber={setAmount}
      />
      <InputTimestamp
        id={(id || defaultId) + '-expiration'}
        label={(label || defaultLabel) + ' expiration'}
        timestamp={expiration}
        setTimestamp={setExpiration}
      />
    </>
  )
}

export default InputAllowance
