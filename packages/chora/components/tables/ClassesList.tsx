'use client'

import * as React from 'react'

import { ClassesListItem } from '.'

import styles from './ClassesList.module.css'

const ClassesList = ({ classes, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.list}>
      {classes &&
        classes.map((clazz: any) => (
          <ClassesListItem
            key={clazz.denom}
            clazz={clazz}
            renderAddress={renderAddress}
            renderLink={renderLink}
          />
        ))}
    </div>
  )
}

export default ClassesList
