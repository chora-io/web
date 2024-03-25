'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useResolvers } from '@hooks/useResolvers'

import styles from './Resolvers.module.css'

const Resolvers = () => {
  const { iri } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const [resolvers, error] = useResolvers(chainInfo, `${iri}`)

  return (
    <div className={styles.box}>
      {!resolvers ||
        (resolvers.length === 0 && (
          <div className={styles.boxText}>
            <p>{'No registration records found.'}</p>
          </div>
        ))}
      {resolvers &&
        resolvers.map((resolver: any) => (
          <>
            <div className={styles.boxText}>
              <h3>{'id'}</h3>
              <p>{resolver ? resolver['id'] : 'NA'}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'manager'}</h3>
              <p>{resolver ? resolver['manager'] : 'NA'}</p>
            </div>
            <div className={styles.boxText}>
              <h3>{'url'}</h3>
              <p>{resolver ? resolver['url'] : 'NA'}</p>
            </div>
            <hr />
          </>
        ))}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Resolvers
