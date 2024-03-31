'use client'

import { PaginationNav, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import GeonodesList from '@components/geonodes/GeonodesList'
import GeonodesTable from '@components/geonodes/GeonodesTable'
import { useGeonodes } from '@hooks/useGeonodes'

import styles from './Geonodes.module.css'

const Geonodes = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch nodes from selected network
  const [nodes, error] = useGeonodes(chainInfo, 5, offset)

  return (
    <div className={styles.box}>
      <div className={styles.boxOptions}>
        <button
          className={view === 'table' ? styles.active : undefined}
          onClick={() => setView('table')}
        >
          {'table view'}
        </button>
        <button
          className={view === 'list' ? styles.active : undefined}
          onClick={() => setView('list')}
        >
          {'list view'}
        </button>
      </div>
      {!nodes && !error && <p>{'loading...'}</p>}
      {!error && nodes && nodes.length === 0 && <p>{'no nodes found'}</p>}
      {nodes && nodes.length > 0 && (
        <>
          {view === 'table' ? (
            <GeonodesTable nodes={nodes} />
          ) : (
            <GeonodesList nodes={nodes} />
          )}
          <PaginationNav
            length={nodes ? nodes.length : 0}
            maxLength={5}
            offset={offset}
            setOffset={setOffset}
          />
        </>
      )}
      <Result error={error} />
    </div>
  )
}

export default Geonodes
