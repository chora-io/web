import * as React from 'react'
import { useEffect } from 'react'

import { ManageList } from '..'
import { InputIssuer } from '.'

const defaultId = 'issuers'

const InputIssuers = ({
  id,
  label,
  lockLabel,
  network,
  issuers,
  setIssuers,
}: any) => {
  useEffect(() => {
    let is = [...issuers]
    is = is.map((m, i) => ({ index: i, ...m }))
    setIssuers(is)
  }, [issuers.length])

  const handleSetIssuer = (issuer: any) => {
    const is = [...issuers]
    is[issuer.index] = issuer
    setIssuers(is)
  }

  const handleAddIssuer = (event: any) => {
    event?.preventDefault()
    const is = [...issuers]
    is.push({ index: issuers.length, address: '' })
    setIssuers(is)
  }

  const handleRemoveIssuer = (event: any) => {
    event?.preventDefault()
    if (issuers.length > 0) {
      const is = [...issuers]
      is.pop()
      setIssuers(is)
    }
  }

  return (
    <>
      {(lockLabel || issuers.length === 0) && (
        <label>{label || 'issuers'}</label>
      )}
      {issuers.map((issuer: any, index: number) => (
        <InputIssuer
          key={index}
          id={(id || defaultId) + '-issuer-' + (index + 1)}
          label={'issuer ' + (index + 1)}
          network={network}
          issuer={issuer}
          setIssuer={handleSetIssuer}
        />
      ))}
      <ManageList
        label="issuer"
        addItem={handleAddIssuer}
        removeItem={handleRemoveIssuer}
        notEmpty={issuers.length > 0}
      />
    </>
  )
}

export default InputIssuers
