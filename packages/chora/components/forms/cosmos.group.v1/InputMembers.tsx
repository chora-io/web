import * as React from 'react'
import { useEffect, useState } from 'react'

import { ManageList } from '..'
import { InputMember } from '.'

const defaultId = 'members'

const InputMembers = ({
  id,
  network,
  members,
  initMembers,
  setMembers,
}: any) => {
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffect(() => {
    let ms: any[]
    if (initialized) {
      ms = [...members]
    } else {
      ms = initMembers ? [...initMembers] : []
      setInitialized(true)
    }
    ms = ms.map((m, i) => ({ index: i, ...m }))
    setMembers(ms)
  }, [members?.length])

  const handleSetMember = (member: any) => {
    const ms = [...members]
    ms[member.index] = member
    setMembers(ms)
  }

  const handleAddMember = (event: any) => {
    event?.preventDefault()
    const ms = [...members]
    ms.push({ index: members.length, address: '', weight: '', metadata: '' })
    setMembers(ms)
  }

  const handleRemoveMember = (event: any) => {
    event?.preventDefault()
    if (members.length > 0) {
      const ms = [...members]
      ms.pop()
      setMembers(ms)
    }
  }

  return (
    <>
      {members.map((member: any, index: number) => (
        <InputMember
          key={index}
          id={(id || defaultId) + '-member-' + (index + 1)}
          label={'member ' + (index + 1)}
          network={network}
          member={member}
          setMember={handleSetMember}
        />
      ))}
      <ManageList
        label="member"
        addItem={handleAddMember}
        removeItem={handleRemoveMember}
        notEmpty={members.length > 0}
      />
    </>
  )
}

export default InputMembers
