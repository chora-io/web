'use client'

import { Classes } from 'chora/components/boxes'
import { WalletContext } from 'chora/contexts'
import Link from 'next/link'
import { useContext, useState } from 'react'

import { useClasses } from '@hooks/useClasses'

const ClassesContainer = () => {
  const { chainInfo, network } = useContext(WalletContext)

  const limit = 5

  const [offset, setOffset] = useState(0)
  const [view, setView] = useState('table')

  // fetch classes from selected network
  const [classes, error] = useClasses(chainInfo, limit, offset)

  const renderLink = (classId: string) => (
    <Link href={`/${network}/classes/${classId}`}>{'view class'}</Link>
  )

  return (
    <Classes
      classes={classes}
      error={error}
      renderLink={renderLink}
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      view={view}
      setView={setView}
    />
  )
}

export default ClassesContainer
