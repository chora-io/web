import { useContext, useEffect, useState } from 'react'

import { GroupContext } from '@contexts/GroupContext'

// determine group member and member authorized
export const useMemberPermissions = (wallet: any, msgType: string) => {
  const { authzGrantee } = useContext(GroupContext) // TODO: error
  const { members } = useContext(GroupContext) // TODO: errors

  const [isMember, setIsMember] = useState<boolean>(false)
  const [isAuthz, setIsAuthz] = useState<boolean>(false)

  useEffect(() => {
    if (members && wallet) {
      const member = members.find(
        (m: any) => m.member.address === wallet.bech32Address,
      )
      setIsMember(member ? true : false)
    }
  }, [members?.length, wallet?.bech32Address])

  useEffect(() => {
    if (authzGrantee && wallet) {
      const authz = authzGrantee.find(
        (g: any) =>
          members.find((m: any) => m.member.address === g.granter) &&
          g.grant.authorization.msg === msgType,
      )
      setIsAuthz(authz ? true : false)
    }
  }, [authzGrantee?.length, wallet?.bech32Address])

  return [isMember, isAuthz]
}
