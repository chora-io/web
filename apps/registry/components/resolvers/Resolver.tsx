'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useResolver } from '@hooks/useResolver'

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
        <p>{id ? id : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'url'}</h3>
        <p>{resolver && resolver['url'] ? resolver['url'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'manager'}</h3>
        <p>{resolver && resolver['manager'] ? resolver['manager'] : 'NA'}</p>
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(resolver, null, ' ')}</p>
        </pre>
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
