import * as React from "react"
import { useEffect } from "react"

import InputMember from "./InputMember"

import * as styles from "./InputMembers.module.css"

const defaultId = "members"

const InputMembers = ({ id, network, members, setMembers }: any) => {

  useEffect(() => {
    let ms = [...members]
    ms = ms.map((m, i) => ({ index: i, ...m }))
    setMembers(ms)
  }, [members.length])

  const handleSetMember = (member) => {
    const ms = [...members]
    ms[member.index] = member
    setMembers(ms)
  }

  const handleAddMember = (event) => {
    event?.preventDefault()
    const ms = [...members]
    ms.push({address: "", weight: "", metadata: ""})
    setMembers(ms)
  }

  const handleRemoveMember = (event) => {
    event?.preventDefault()
    if (members.length > 0) {
      const ms = [...members]
      ms.pop()
      setMembers(ms)
    }
  }

  return (
    <>
      {members.map((member, index) => (
        <InputMember
          key={index}
          id={(id || defaultId) + "-member-" + (index+1)}
          label={"member " + (index+1)}
          network={network}
          member={member}
          setMember={handleSetMember}
        />
      ))}
      <span className={styles.options}>
        <button onClick={handleAddMember}>
          {"add member"}
        </button>
        {members.length > 0 && (
          <button onClick={handleRemoveMember}>
          {"remove member"}
          </button>
        )}
      </span>
    </>
  )
}

export default InputMembers
