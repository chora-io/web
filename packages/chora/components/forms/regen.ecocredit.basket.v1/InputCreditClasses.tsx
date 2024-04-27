import * as React from 'react'
import { useEffect } from 'react'

import { ManageList } from '..'
import { SelectCreditClass } from '../regen.ecocredit.v1'

const defaultId = 'allowed-credit-class'

const InputCreditClasses = ({ id, options, classes, setClasses }: any) => {
  useEffect(() => {
    let cs = [...classes]
    cs = cs.map((c, i) => ({ index: i, ...c }))
    setClasses(cs)
  }, [classes.length])

  const handleSetCreditClass = (clazz: any) => {
    const cs = [...classes]
    cs[clazz.index] = clazz
    setClasses(cs)
  }

  const handleAddCreditClass = (event: any) => {
    event?.preventDefault()
    const cs = [...classes]
    cs.push({
      admin: '',
      issuers: [],
      metadata: '',
      creditTypeAbbrev: '',
      fee: { denom: '', amount: '' },
    })
    setClasses(cs)
  }

  const handleRemoveCreditClass = (event: any) => {
    event?.preventDefault()
    if (classes.length > 0) {
      const cs = [...classes]
      cs.pop()
      setClasses(cs)
    }
  }

  return (
    <>
      {classes.length === 0 && <label>{'allowed credit classes'}</label>}
      {classes.map((clazz: any, index: number) => (
        <SelectCreditClass
          key={index}
          id={(id || defaultId) + '-class-' + (index + 1)}
          label={'class ' + (index + 1)}
          options={options}
          setSelected={handleSetCreditClass}
        />
      ))}
      <ManageList
        label="class"
        addItem={handleAddCreditClass}
        removeItem={handleRemoveCreditClass}
        notEmpty={classes.length > 0}
      />
    </>
  )
}

export default InputCreditClasses
