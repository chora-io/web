'use client'

import SubjectsListItem from '@components/subjects/SubjectsListItem'

const SubjectsList = ({ subjects }: any) => {
  return (
    <>
      {subjects &&
        subjects.map((subject: any) => (
          <SubjectsListItem key={subject.id} subject={subject} />
        ))}
    </>
  )
}

export default SubjectsList
