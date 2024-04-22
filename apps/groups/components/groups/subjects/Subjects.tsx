'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext } from 'react'

import SubjectPreview from '@components/groups/subjects/SubjectPreview'
import { GroupContext } from '@contexts/GroupContext'
import { useGroupSubjects } from '@hooks/useGroupSubjects'

import styles from './Subjects.module.css'

const Subjects = () => {
  const { policies, policiesError } = useContext(GroupContext)
  const { chainInfo } = useContext(WalletContext)

  // fetch subjects curated by group from selected network
  const [subjects, subjectsError] = useGroupSubjects(chainInfo, policies)

  const error = policiesError || subjectsError

  return (
    <div className={styles.box}>
      {!error && !subjects && <div>{'loading...'}</div>}
      {!error && subjects && subjects.length === 0 && (
        <div>{'no subjects found'}</div>
      )}
      {Array.isArray(subjects) &&
        subjects.map((subject) => (
          <SubjectPreview key={subject['id']} subject={subject} />
        ))}
      <Result error={error} />
    </div>
  )
}

export default Subjects
