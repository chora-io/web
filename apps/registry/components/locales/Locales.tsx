'use client'

import { PaginationNav, Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useState } from 'react'

import LocalesList from '@components/locales/LocalesList'
import LocalesTable from '@components/locales/LocalesTable'
import { useLocales } from '@hooks/useLocales'

import styles from './Locales.module.css'

const Locales = () => {
  const { chainInfo } = useContext(WalletContext)

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch locales from selected network
  const [locales, error] = useLocales(chainInfo, 5, offset)

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
      {!locales && !error && <p>{'loading...'}</p>}
      {!error && locales && locales.length === 0 && <p>{'no locales found'}</p>}
      {locales && locales.length > 0 && (
        <>
          {view === 'table' ? (
            <LocalesTable locales={locales} />
          ) : (
            <LocalesList locales={locales} />
          )}
          <PaginationNav
            length={locales ? locales.length : 0}
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

export default Locales
