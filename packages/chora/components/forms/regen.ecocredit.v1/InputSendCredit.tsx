import { MsgSend_SendCredits } from 'cosmos/api/regen/ecocredit/v1/tx'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputNumber, InputString } from '..'
import { InputBatchDenom } from '.'

const defaultId = 'credit'
const defaultLabel = 'credit'

const InputSendCredit = ({ id, label, setCredit }: any) => {
  const [batchDenom, setBatchDenom] = useState<string>('')
  const [tradableAmount, setTradableAmount] = useState<string>('')
  const [retiredAmount, setRetiredAmount] = useState<string>('')
  const [retirementJurisdiction, setRetirementJurisdiction] =
    useState<string>('')
  const [retirementReason, setRetirementReason] = useState<string>('')

  useEffect(() => {
    const c = {
      typeUrl: '/regen.ecocredit.v1.MsgSend.SendCredits',
      value: MsgSend_SendCredits.encode({
        $type: 'regen.ecocredit.v1.MsgSend.SendCredits',
        batchDenom: batchDenom,
        tradableAmount: tradableAmount,
        retiredAmount: retiredAmount,
        retirementJurisdiction: retirementJurisdiction,
        retirementReason: retirementReason,
      }).finish(),
    }

    setCredit(c)
  }, [
    batchDenom,
    tradableAmount,
    retiredAmount,
    retirementJurisdiction,
    retirementReason,
  ])

  return (
    <>
      <InputBatchDenom
        id={(id || defaultId) + '-batch-denom'}
        label={(label || defaultLabel) + ' batch denom'}
        batchDenom={batchDenom}
        setBatchDenom={setBatchDenom}
      />
      <InputNumber
        id={(id || defaultId) + '-tradable-amount'}
        label={(label || defaultLabel) + ' tradable amount'}
        number={tradableAmount}
        setNumber={setTradableAmount}
      />
      <InputNumber
        id={(id || defaultId) + '-tradable-amount'}
        label={(label || defaultLabel) + ' tradable amount'}
        number={retiredAmount}
        setNumber={setRetiredAmount}
      />
      <InputString
        id={(id || defaultId) + '-retirement-jurisdiction'}
        label={(label || defaultLabel) + ' retirement jurisdiction'}
        placeholder="US-WA"
        string={retirementJurisdiction}
        setString={setRetirementJurisdiction}
      />
      <InputString
        id={(id || defaultId) + '-retirement-reason'}
        label={(label || defaultLabel) + ' retirement reason'}
        placeholder="offsetting energy consumption"
        string={retirementReason}
        setString={setRetirementReason}
      />
    </>
  )
}

export default InputSendCredit
