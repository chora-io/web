import { BatchIssuance } from 'cosmos/api/regen/ecocredit/v1/types'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputAddress, InputNumber, InputString } from '..'

const defaultId = 'credit'
const defaultLabel = 'credit'

const InputIssuance = ({ id, label, setIssuance }: any) => {
  const [recipient, setRecipient] = useState<string>('')
  const [tradableAmount, setTradableAmount] = useState<string>('')
  const [retiredAmount, setRetiredAmount] = useState<string>('')
  const [retirementJurisdiction, setRetirementJurisdiction] =
    useState<string>('')
  const [retirementReason, setRetirementReason] = useState<string>('')

  useEffect(() => {
    const c = {
      typeUrl: '/regen.ecocredit.v1.BatchIssuance',
      value: BatchIssuance.encode({
        $type: 'regen.ecocredit.v1.BatchIssuance',
        recipient: recipient,
        tradableAmount: tradableAmount,
        retiredAmount: retiredAmount,
        retirementJurisdiction: retirementJurisdiction,
        retirementReason: retirementReason,
      }).finish(),
    }

    setIssuance(c)
  }, [
    recipient,
    tradableAmount,
    retiredAmount,
    retirementJurisdiction,
    retirementReason,
  ])

  return (
    <>
      <InputAddress
        id={(id || defaultId) + '-recipient'}
        label={(label || defaultLabel) + ' recipient'}
        address={recipient}
        setAddress={setRecipient}
      />
      <InputNumber
        id={(id || defaultId) + '-tradable-amount'}
        label={(label || defaultLabel) + ' tradable amount'}
        number={tradableAmount}
        setNumber={setTradableAmount}
      />
      <InputNumber
        id={(id || defaultId) + '-retired-amount'}
        label={(label || defaultLabel) + ' retired amount'}
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

export default InputIssuance
