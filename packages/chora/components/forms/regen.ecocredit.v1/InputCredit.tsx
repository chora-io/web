import { Credits } from 'cosmos/api/regen/ecocredit/v1/types'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputNumber } from '..'
import { InputBatchDenom } from '.'

const defaultId = 'credit'
const defaultLabel = 'credit'

const InputCredit = ({ id, label, credit, setCredit }: any) => {
  const [batchDenom, setBatchDenom] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  useEffect(() => {
    const c = {
      index: credit ? credit.index : undefined,
      typeUrl: '/regen.ecocredit.v1.Credits',
      value: Credits.encode({
        $type: 'regen.ecocredit.v1.Credits',
        batchDenom: batchDenom,
        amount: amount,
      }).finish(),
    }

    setCredit(c)
  }, [batchDenom, amount])

  return (
    <>
      <InputBatchDenom
        id={(id || defaultId) + '-denom'}
        label={(label || defaultLabel) + ' denom'}
        batchDenom={batchDenom}
        setBatchDenom={setBatchDenom}
      />
      <InputNumber
        id={(id || defaultId) + '-amount'}
        label={(label || defaultLabel) + ' amount'}
        number={amount}
        setNumber={setAmount}
      />
    </>
  )
}

export default InputCredit
