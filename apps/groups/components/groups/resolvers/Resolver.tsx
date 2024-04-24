'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useResolver } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

import styles from './Resolver.module.css'

const Resolver = () => {
  const { id } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch resolver from selected network
  const [resolver, error] = useResolver(chainInfo, `${id}`)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{resolver?.id || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'url'}</h3>
        <p>{resolver?.url || 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'manager'}</h3>
        <p>{resolver ? <Address address={resolver.manager} /> : 'NA'}</p>
      </div>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Resolver
