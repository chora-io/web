'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import GeonodePreview from '@components/groups/geonodes/GeonodePreview'
import { useGroupGeonodes } from '@hooks/useGroupGeonodes'

import styles from './Geonodes.module.css'

const Geonodes = () => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch geonodes curated by group from selected network
  const [nodes, error] = useGroupGeonodes(chainInfo, groupId)

  return (
    <div className={styles.box}>
      {!error && !nodes && <div>{'loading...'}</div>}
      {!error && nodes && nodes.length === 0 && <div>{'no nodes found'}</div>}
      {Array.isArray(nodes) &&
        nodes.map((node) => <GeonodePreview key={node['id']} node={node} />)}
      <Result error={error} />
    </div>
  )
}

export default Geonodes
