import { AccountContext, WalletContext } from 'chora/contexts'
import { useClassAllowlist, useClassCreators } from 'chora/hooks'
import { useContext, useEffect, useState } from 'react'

// determine class creator and account authorized
export const usePermissionsClass = (wallet: any, msgType: string) => {
  const { authzGrantee, authzError } = useContext(AccountContext)
  const { chainInfo } = useContext(WalletContext)

  const [allowlist, allowlistError] = useClassAllowlist(chainInfo)
  const [creators, creatorsError] = useClassCreators(chainInfo)

  // class creator
  const [isCreator, setIsCreator] = useState<boolean>(false)

  // account authorized
  const [isAuthz, setIsAuthz] = useState<boolean>(false)

  // loading permissions
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // error fetching parameters
  const error = authzError || allowlistError || creatorsError

  useEffect(() => {
    if (allowlist === 'disabled') {
      setIsCreator(true)
      setIsLoading(false)
    } else if (Array.isArray(creators) && wallet) {
      const creator = creators.find((c: string) => c === wallet.bech32Address)
      setIsCreator(creator ? true : false)
      setIsLoading(false)
    }
  }, [allowlist, creators, wallet?.bech32Address])

  useEffect(() => {
    if (authzGrantee && wallet) {
      const authz = authzGrantee.find(
        (g: any) => g.grant.authorization.msg === msgType,
      )
      setIsAuthz(authz ? true : false)
    }
  }, [authzGrantee?.length, wallet?.bech32Address])

  return [isCreator, isAuthz, isLoading, error]
}
