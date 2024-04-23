'use client'

import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import * as React from 'react'
import { createContext, useContext } from 'react'

import { useGroupInfo } from '@hooks/useGroupInfo'
import { useGroupMembers } from '@hooks/useGroupMembers'
import { useGroupPolicies } from '@hooks/useGroupPolicies'

const GroupContext = createContext<any>({})

const GroupContextProvider = (props: any) => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  const [group, groupError] = useGroupInfo(chainInfo, groupId)
  const [policies, policiesError] = useGroupPolicies(chainInfo, groupId)
  const [members, membersError] = useGroupMembers(chainInfo, groupId)

  return (
    <GroupContext.Provider
      value={{
        group,
        groupError,
        policies,
        policiesError,
        members,
        membersError,
      }}
    >
      {props.children}
    </GroupContext.Provider>
  )
}

export { GroupContext, GroupContextProvider }
