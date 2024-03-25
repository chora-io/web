'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useGeonode } from '@hooks/useGeonode'
import { useMetadata } from '@hooks/useMetadata'

import styles from './Geonode.module.css'

const Geonode = () => {
  const { id } = useParams()

  const { chainInfo, wallet } = useContext(WalletContext)

  const [node, nodeError] = useGeonode(chainInfo, `${id}`)
  const [metadata, metadataError] = useMetadata(
    chainInfo,
    node ? node.metadata : null,
  )

  const error = nodeError || metadataError

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'description'}</h3>
        <p>
          {metadata && metadata['description'] ? metadata['description'] : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        <p>
          {node && node.curator ? node.curator : 'NA'}
          {wallet && node && node.curator === wallet.bech32Address && (
            <span className={styles.activeAccount}>{'(active account)'}</span>
          )}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'latitude'}</h3>
        <p>
          {metadata && metadata['geo'] && metadata['geo']['latitude']
            ? metadata['geo']['latitude']
            : 'NA'}
        </p>
      </div>
      <div className={styles.boxText}>
        <h3>{'longitude'}</h3>
        <p>
          {metadata && metadata['geo'] && metadata['geo']['longitude']
            ? metadata['geo']['longitude']
            : 'NA'}
        </p>
      </div>
      <hr />
      <div className={styles.boxText}>
        <h3>{'data stored on blockchain network'}</h3>
        <pre>
          <p>{JSON.stringify(node, null, ' ')}</p>
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

export default Geonode
