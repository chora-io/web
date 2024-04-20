'use client'

import LocalesListItem from '@components/locales/LocalesListItem'

const LocalesList = ({ nodes }: any) => {
  return (
    <>
      {nodes &&
        nodes.map((node: any) => <LocalesListItem key={node.id} node={node} />)}
    </>
  )
}

export default LocalesList
