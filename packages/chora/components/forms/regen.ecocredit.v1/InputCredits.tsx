import * as React from 'react'
import { useEffect } from 'react'

import { ManageList } from '..'
import { InputCredit } from '.'

const defaultId = 'credits'

const InputCredits = ({ id, network, credits, setCredits }: any) => {
  useEffect(() => {
    let is = [...credits]
    is = is.map((m, i) => ({ index: i, ...m }))
    setCredits(is)
  }, [credits.length])

  const handleSetCredit = (credit: any) => {
    const is = [...credits]
    is[credit.index] = credit
    setCredits(is)
  }

  const handleAddCredit = (event: any) => {
    event?.preventDefault()
    const is = [...credits]
    is.push({ batchDenom: '', amount: '' })
    setCredits(is)
  }

  const handleRemoveCredit = (event: any) => {
    event?.preventDefault()
    if (credits.length > 0) {
      const is = [...credits]
      is.pop()
      setCredits(is)
    }
  }

  return (
    <>
      {credits.length === 0 && <label>{'credits'}</label>}
      {credits.map((credit: any, index: number) => (
        <InputCredit
          key={index}
          id={(id || defaultId) + '-credit-' + (index + 1)}
          label={'credit ' + (index + 1)}
          network={network}
          credit={credit}
          setCredit={handleSetCredit}
        />
      ))}
      <ManageList
        label="credit"
        addItem={handleAddCredit}
        removeItem={handleRemoveCredit}
        notEmpty={credits.length > 0}
      />
    </>
  )
}

export default InputCredits
