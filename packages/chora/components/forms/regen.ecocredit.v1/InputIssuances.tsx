import * as React from 'react'
import { useEffect } from 'react'

import { ManageList } from '..'
import { InputIssuance } from '.'

const defaultId = 'issuances'

const InputIssuances = ({ id, network, issuances, setIssuances }: any) => {
  useEffect(() => {
    let is = [...issuances]
    is = is.map((m, i) => ({ index: i, ...m }))
    setIssuances(is)
  }, [issuances.length])

  const handleSetIssuance = (issuance: any) => {
    const is = [...issuances]
    is[issuance.index] = issuance
    setIssuances(is)
  }

  const handleAddIssuance = (event: any) => {
    event?.preventDefault()
    const is = [...issuances]
    is.push({
      recipient: '',
      tradableAmount: '',
      retiredAmount: '',
      retirementJurisdiction: '',
      retirementReason: '',
    })
    setIssuances(is)
  }

  const handleRemoveIssuance = (event: any) => {
    event?.preventDefault()
    if (issuances.length > 0) {
      const is = [...issuances]
      is.pop()
      setIssuances(is)
    }
  }

  return (
    <>
      {issuances.length === 0 && <label>{'issuances'}</label>}
      {issuances.map((issuance: any, index: number) => (
        <InputIssuance
          key={index}
          id={(id || defaultId) + '-issuance-' + (index + 1)}
          label={'issuance ' + (index + 1)}
          network={network}
          issuance={issuance}
          setIssuance={handleSetIssuance}
        />
      ))}
      <ManageList
        label="issuance"
        addItem={handleAddIssuance}
        removeItem={handleRemoveIssuance}
        notEmpty={issuances.length > 0}
      />
    </>
  )
}

export default InputIssuances
