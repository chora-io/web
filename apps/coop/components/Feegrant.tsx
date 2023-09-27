import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import { useNetworkCoop } from 'chora/hooks'

import FeegrantAllowance from './FeegrantAllowance'

import styles from './Feegrant.module.css'

const queryAllowancesByGrantee = 'cosmos/feegrant/v1beta1/allowances'
const queryAllowancesByGranter = 'cosmos/feegrant/v1beta1/issued'

const Feegrant = ({ address }: any) => {
  const { chainInfo, network } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)

  // fetch error and results
  const [error, setError] = useState<string | undefined>(undefined)
  const [allowancesGrantee, setAllowancesGrantee] = useState<any[] | undefined>(
    undefined,
  )
  const [allowancesGranter, setAllowancesGranter] = useState<any[] | undefined>(
    undefined,
  )

  // list options
  const [filter, setFilter] = useState<string>('grantee')

  // reset state on address or network change
  useEffect(() => {
    setError(undefined)
    setAllowancesGrantee(undefined)
    setAllowancesGranter(undefined)
    setFilter('grantee')
  }, [address, chainInfo?.chainId])

  // fetch on load and address or group change
  useEffect(() => {
    // fetch allowances from selected network
    if (groupId) {
      fetchAllowances().catch((err) => {
        setError(err.message)
      })
    }
  }, [address, groupId])

  // fetch allowances from selected network
  const fetchAllowances = async () => {
    // fetch allowances by grantee from selected network
    await fetch(chainInfo.rest + '/' + queryAllowancesByGrantee + '/' + address)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          setAllowancesGrantee(res['allowances'])
        }
      })

    // fetch allowances by granter from selected network
    await fetch(chainInfo.rest + '/' + queryAllowancesByGranter + '/' + address)
      .then((res) => res.json())
      .then((res) => {
        if (res.code) {
          setError(res.message)
        } else {
          setAllowancesGranter(res['allowances'])
        }
      })
  }

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={filter === 'grantee' ? styles.boxOptionActive : undefined}
          onClick={() => setFilter('grantee')}
        >
          {'grantee'}
        </button>
        <button
          className={filter === 'granter' ? styles.boxOptionActive : undefined}
          onClick={() => setFilter('granter')}
        >
          {'granter'}
        </button>
      </div>
      {!error && !allowancesGrantee && !allowancesGranter && (
        <div>{'loading...'}</div>
      )}
      {filter === 'grantee' && (
        <div>
          {allowancesGrantee &&
            allowancesGrantee.map((allowance, i) => (
              <FeegrantAllowance key={i} allowance={allowance} />
            ))}
          {allowancesGrantee && allowancesGrantee.length === 0 && (
            <div>{'no fee allowances granted to this account'}</div>
          )}
        </div>
      )}
      {filter === 'granter' && (
        <div>
          {allowancesGranter &&
            allowancesGranter.map((allowance, i) => (
              <FeegrantAllowance key={i} allowance={allowance} />
            ))}
          {allowancesGranter && allowancesGranter.length === 0 && (
            <div>{'no fee allowances granted by this account'}</div>
          )}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  )
}

export default Feegrant
