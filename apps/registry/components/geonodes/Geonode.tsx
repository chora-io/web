'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useGeonode } from '@hooks/useGeonode'

import styles from './Geonode.module.css'

const Geonode = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch node and node metadata from selected network and network server
  const [node, metadata, error] = useGeonode(chainInfo, `${id}`)

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
        <p>{node?.curator ? node.curator : 'NA'}</p>
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
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default Geonode
