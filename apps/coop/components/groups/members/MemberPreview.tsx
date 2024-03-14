import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import { useGroupMemberMetadata } from '@hooks/useGroupMemberMetadata'

import styles from './MemberPreview.module.css'

const MemberPreview = ({ member }: any) => {
  const { groupId } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch member metadata by iri from network server
  const [metadata, error] = useGroupMemberMetadata(chainInfo, member.metadata)

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'name'}</h3>
        <p>{metadata && metadata['name'] ? metadata['name'] : 'NA'}</p>
      </div>
      <div className={styles.boxText}>
        <h3>{'address'}</h3>
        <p>{member['address']}</p>
      </div>
      <Link href={`/groups/${groupId}/members/${member['address']}`}>
        {'view member'}
      </Link>
      {error && (
        <div className={styles.boxText}>
          <Result error={error} />
        </div>
      )}
    </div>
  )
}

export default MemberPreview
