import { AccountContext, WalletContext } from 'chora/contexts'
import { useClassIssuers } from 'chora/hooks'
import { useContext, useEffect, useState } from 'react'

// determine class issuer and account authorized
export const usePermissionsIssuer = (
  wallet: any,
  classId: string,
  msgType: string,
) => {
  const { authzGrantee, authzError } = useContext(AccountContext)
  const { chainInfo } = useContext(WalletContext)

  const [issuers, issuersError] = useClassIssuers(chainInfo, classId)

  // class issuer
  const [isIssuer, setIsIssuer] = useState<boolean>(false)

  // account authorized
  const [isAuthz, setIsAuthz] = useState<boolean>(false)

  // loading permissions
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // error fetching parameters
  const error = authzError || issuersError

  useEffect(() => {
    if (issuers && wallet) {
      const issuer = issuers.find((c: string) => c === wallet.bech32Address)
      setIsIssuer(issuer ? true : false)
      setIsLoading(false)
    }
  }, [issuers, wallet?.bech32Address])

  useEffect(() => {
    if (authzGrantee && wallet) {
      const authz = authzGrantee.find(
        (g: any) => g.grant.authorization.msg === msgType,
      )
      setIsAuthz(authz ? true : false)
    }
  }, [authzGrantee?.length, wallet?.bech32Address])

  return [isIssuer, isAuthz, isLoading, error]
}
