import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import Address from '@components/Address'

import styles from './LocalePreview.module.css'

const LocalePreview = ({ locale }: any) => {
  const { groupId } = useParams()
  const { chainInfo, network } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, locale.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'curator'}</h3>
        <p>{locale?.curator ? <Address address={locale.curator} /> : 'NA'}</p>
      </div>
      <Link href={`/${network}/${groupId}/locales/${locale['id']}`}>
        {'view locale'}
      </Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default LocalePreview
