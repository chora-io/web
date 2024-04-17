'use client'

import GroupsListItem from '@components/groups/GroupsListItem'

const GroupsList = ({ groups }: any) => {
  return (
    <>
      {groups &&
        groups.map((group: any) => (
          <GroupsListItem key={group.id} group={group} />
        ))}
    </>
  )
}

export default GroupsList
