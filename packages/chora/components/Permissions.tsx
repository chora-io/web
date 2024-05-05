'use client'

import * as React from 'react'

import { CheckIcon } from './icons'

import styles from './Permissions.module.css'

const Permissions = ({ permissions }: any) => {
  return (
    <div className={styles.boxOptions}>
      {permissions.map((permission: any, i: number) => (
        <span className={styles.permission} key={i}>
          <b>
            {permission.isUnknown ? (
              '?'
            ) : permission.hasPermission ? (
              <CheckIcon />
            ) : (
              'x'
            )}
          </b>
          {permission.label}
        </span>
      ))}
    </div>
  )
}

export default Permissions
