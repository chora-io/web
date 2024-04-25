'use client'

import * as React from 'react'

import { SubjectsListItem } from '.'

import styles from './SubjectsList.module.css'

const SubjectsList = ({ subjects, renderAddress, renderLink }: any) => {
  return (
    <div className={styles.list}>
      {subjects &&
        subjects.map((subject: any) => (
          <SubjectsListItem
            key={subject.id}
            subject={subject}
            renderAddress={renderAddress}
            renderLink={renderLink}
          />
        ))}
    </div>
  )
}

export default SubjectsList
