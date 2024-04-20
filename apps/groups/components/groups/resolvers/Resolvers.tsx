'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'
import { useGroupResolvers } from '@hooks/useGroupResolvers'

import styles from './Resolvers.module.css'

const Resolvers = () => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch data resolvers from selected network
  const [resolvers, error] = useGroupResolvers(chainInfo, `${groupId}`)

  return (
    <div className={styles.box}>
      {!error && !resolvers && <div>{'loading...'}</div>}
      {Array.isArray(resolvers) &&
        resolvers.map((resolver: any) => (
          <div className={styles.boxItem} key={resolver['id']}>
            <div className={styles.boxText}>
              <h3>{'id'}</h3>
              <p>{resolver['id']}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'url'}</h3>
              <p>{resolver['url']}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'manager'}</h3>
              <p>
                {resolver['manager'] ? (
                  <Address address={resolver['manager']} />
                ) : (
                  'NA'
                )}
              </p>
            </div>
          </div>
        ))}
      {!error && chainInfo?.chainId && resolvers?.length === 0 && (
        <div>{'no resolvers found'}</div>
      )}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Resolvers
