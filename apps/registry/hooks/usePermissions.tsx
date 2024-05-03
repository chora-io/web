import { AccountContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

// determine account authorized
export const usePermissions = (wallet: any, msgType: string) => {
  const { authzGrantee, authzError } = useContext(AccountContext)

  // account authorized
  const [isAuthz, setIsAuthz] = useState<boolean>(false)

  // error fetching initial parameters
  const initError = authzError

  useEffect(() => {
    if (authzGrantee && wallet) {
      const authz = authzGrantee.find(
        (g: any) => g.grant.authorization.msg === msgType,
      )
      setIsAuthz(authz ? true : false)
    }
  }, [authzGrantee?.length, wallet?.bech32Address])

  return [isAuthz, initError]
}
