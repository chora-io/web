import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext } from 'react'

import { useGeonodeMetadata } from '@hooks/useGeonodeMetadata'

import styles from './GeonodePreview.module.css'

const GeonodePreview = ({ node }: any) => {
  const { chainInfo } = useContext(WalletContext)

  // fetch node metadata by iri from network server
  const [metadata, error] = useGeonodeMetadata(chainInfo, node.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        <p>{node?.curator ? node.curator : 'NA'}</p>
      </div>
      <Link href={`/geonodes/${node['id']}`}>{'view node'}</Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default GeonodePreview
