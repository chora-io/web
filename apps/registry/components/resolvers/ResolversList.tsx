'use client'

import ResolversListItem from '@components/resolvers/ResolversListItem'

const ResolversList = ({ resolvers }: any) => {
  return (
    <>
      {resolvers &&
        resolvers.map((resolver: any) => (
          <ResolversListItem key={resolver.id} resolver={resolver} />
        ))}
    </>
  )
}

export default ResolversList
