import { AccountContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

import { GroupContext } from '@contexts/GroupContext'

// determine admin, policy admin and group member, and admin authorized
export const usePermissionsAdmin = (wallet: any, msgType: string) => {
  const { authzGrantee, authzError } = useContext(AccountContext)
  const { group, groupError, members, membersError, policies, policiesError } =
    useContext(GroupContext)

  // error fetching initial parameters
  const initError = authzError || groupError || membersError || policiesError

  // admin, policy admin and group member, and admin authorized
  const [isAdmin, setIsAdmin] = useState<boolean>(false)
  const [isPolicy, setIsPolicy] = useState<boolean>(false)
  const [isAuthz, setIsAuthz] = useState<boolean>(false)

  useEffect(() => {
    if (group && wallet) {
      const admin = group.admin === wallet.bech32Address
      setIsAdmin(admin ? true : false)
    }
  }, [group?.admin, wallet?.bech32Address])

  useEffect(() => {
    if (group && policies && members && wallet) {
      const admin = policies.find((p: any) => p.address === group.admin)
      const member = members.find(
        (m: any) => m.member.address === wallet.bech32Address,
      )
      setIsPolicy(admin && member ? true : false)
    }
  }, [group, policies?.length, members?.length, wallet?.bech32Address])

  useEffect(() => {
    if (authzGrantee && wallet) {
      const authz = authzGrantee.find(
        (g: any) =>
          g.granter === group.admin && g.grant.authorization.msg === msgType,
      )
      setIsAuthz(authz ? true : false)
    }
  }, [authzGrantee?.length, wallet?.bech32Address])

  return [isAdmin, isPolicy, isAuthz, initError]
}
