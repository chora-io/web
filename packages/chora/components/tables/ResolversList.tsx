'use client'

import * as React from 'react'

import { ResolversListItem } from '.'

import styles from './ResolversList.module.css'

const ResolversList = ({ resolvers, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.list}>
      {resolvers &&
        resolvers.map((resolver: any) => (
          <ResolversListItem
            key={resolver.id}
            resolver={resolver}
            renderAddress={renderAddress}
            renderLink={renderLink}
          />
        ))}
    </div>
  )
}

export default ResolversList
