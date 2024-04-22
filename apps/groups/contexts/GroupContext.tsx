'use client'

import { WalletContext } from 'chora/contexts'
import * as React from 'react'
import { createContext, useContext } from 'react'
import { useParams } from 'next/navigation'

import { useGroupPolicies } from '@hooks/useGroupPolicies'
import { useGroupMembers } from '@hooks/useGroupMembers'

const GroupContext = createContext<any>({})

const GroupContextProvider = (props: any) => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  const [policies, policiesError] = useGroupPolicies(chainInfo, groupId)
  const [members, membersError] = useGroupMembers(chainInfo, groupId)

  return (
    <GroupContext.Provider
      value={{ policies, policiesError, members, membersError }}
    >
      {props.children}
    </GroupContext.Provider>
  )
}

export { GroupContext, GroupContextProvider }
