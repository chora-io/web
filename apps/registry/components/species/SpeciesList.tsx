'use client'

import SpeciesListItem from '@components/species/SpeciesListItem'

const SpeciesList = ({ species }: any) => {
  return (
    <>
      {species &&
        species.map((s: any) => <SpeciesListItem key={s.id} species={s} />)}
    </>
  )
}

export default SpeciesList
