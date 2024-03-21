'use client'

import ClassesListItem from '@components/classes/ClassesListItem'

const ClassesList = ({ classes }: any) => {
  return (
    <>
      {classes &&
        classes.map((clazz: any) => (
          <ClassesListItem key={clazz.denom} clazz={clazz} />
        ))}
    </>
  )
}

export default ClassesList
