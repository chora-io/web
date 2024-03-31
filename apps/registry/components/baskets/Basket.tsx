'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useBasket } from '@hooks/useBasket'

import styles from './Basket.module.css'

const Basket = () => {
  const { denom } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch credit basket from selected network
  const [basket, basketError] = useBasket(chainInfo, `${denom}`)

  // fetch metadata from network server, otherwise resolve
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    basket ? basket.metadata : null,
  )

  const error = basketError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'denom'}</h3>
        <p>{denom ? denom : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        <p>{basket && basket['curator'] ? basket['curator'] : 'NA'}</p>
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(basket, null, ' ')}</p>
        </pre>
      </div>
      {metadata && (
        <div className={styles.boxText}>
          <h3>{'data stored with data provider service'}</h3>
          <pre>
            <p>{JSON.stringify(metadata, null, ' ')}</p>
          </pre>
        </div>
      )}
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Basket
