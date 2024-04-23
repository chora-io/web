import { useContext, useEffect, useState } from 'react'

import { GroupContext } from '@contexts/GroupContext'

// determine admin, policy admin and group member, and admin authorized
export const useAdminPermissions = (wallet: any, msgType: string) => {
  const { grantsGrantee } = useContext(GroupContext) // TODO: error
  const { group, members, policies } = useContext(GroupContext) // TODO: errors

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
    if (policies && members && wallet) {
      const admin = policies.find((p: any) => p.address === group.admin)
      const member = members.find(
        (m: any) => m.member.address === wallet.bech32Address,
      )
      setIsPolicy(admin && member ? true : false)
    }
  }, [policies?.length, members?.length, wallet?.bech32Address])

  useEffect(() => {
    if (grantsGrantee && wallet) {
      const authz = grantsGrantee.find(
        (g: any) =>
          g.granter === group.admin && g.grant.authorization.msg === msgType,
      )
      setIsAuthz(authz ? true : false)
    }
  }, [grantsGrantee?.length, wallet?.bech32Address])

  return [isAdmin, isPolicy, isAuthz]
}
