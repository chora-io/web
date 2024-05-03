'use client'

import * as React from 'react'

import styles from './Permissions.module.css'

const Permissions = ({ permissions }: any) => {
  return (
    <div className={styles.boxOptions}>
      {permissions.map((permission: any, i: number) => (
        <span className={styles.permission} key={i}>
          <b>
            {permission.isUnknown ? '?' : permission.hasPermission ? '✓' : 'x'}
          </b>
          {permission.label}
        </span>
      ))}
    </div>
  )
}

export default Permissions
