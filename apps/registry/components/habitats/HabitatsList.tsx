'use client'

import HabitatsListItem from '@components/habitats/HabitatsListItem'

const HabitatsList = ({ habitats }: any) => {
  return (
    <>
      {habitats &&
        habitats.map((habitat: any) => (
          <HabitatsListItem key={habitat.id} habitat={habitat} />
        ))}
    </>
  )
}

export default HabitatsList
