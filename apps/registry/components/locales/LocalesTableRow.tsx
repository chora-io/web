import { WalletContext } from 'chora/contexts'
import { useMetadata } from 'chora/hooks'
import Link from 'next/link'
import { useContext } from 'react'

import styles from './LocalesTableRow.module.css'

const LocalesTableRow = ({ locale }: any) => {
  const { chainInfo, network, wallet } = useContext(WalletContext)

  // parse metadata or fetch from network server, otherwise resolve
  const [metadata, error] = useMetadata(chainInfo, locale.metadata)

  // TODO: handle error
  if (error) {
    console.error(error)
  }

  return (
    <tr>
      <td>{locale.id}</td>
      <td>
        {metadata && metadata['name']
          ? metadata['name'].substring(0, 25) +
            (metadata['name'].length > 25 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {metadata && metadata['description']
          ? metadata['description'].substring(0, 50) +
            (metadata['description'].length > 50 ? '...' : '')
          : 'NA'}
      </td>
      <td>
        {locale.curator.substring(0, 13) +
          '...' +
          locale.curator.substring(38, 44)}
        {wallet && locale.curator === wallet.bech32Address && (
          <span className={styles.activeAccount}>{'(active account)'}</span>
        )}
      </td>
      <td style={{ minWidth: '120px' }}>
        <Link href={`/${network}/locales/${locale.id}`}>{'view locale'}</Link>
      </td>
    </tr>
  )
}

export default LocalesTableRow
