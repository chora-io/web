'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

import LocalePreview from '@components/groups/locales/LocalePreview'
import { useGroupLocales } from '@hooks/useGroupLocales'

import styles from './Locales.module.css'

const Locales = () => {
  const { groupId } = useParams()
  const { chainInfo } = useContext(WalletContext)

  // fetch locales curated by group from selected network
  const [locales, error] = useGroupLocales(chainInfo, groupId)

  return (
    <div className={styles.box}>
      {!error && !locales && <div>{'loading...'}</div>}
      {!error && locales && locales.length === 0 && (
        <div>{'no locales found'}</div>
      )}
      {Array.isArray(locales) &&
        locales.map((locale) => (
          <LocalePreview key={locale['id']} locale={locale} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Locales
