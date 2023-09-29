'use client'

// import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import Geonode from '@components/geonodes/Geonode'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'geonode',
// }

const GeonodePage = () => {
  const { id } = useParams()

  // TODO: valid id, otherwise error

  return (
    <div className={styles.page}>
      <div>
        <h1>{'geonode'}</h1>
        <Geonode nodeId={id} />
      </div>
    </div>
  )
}

export default GeonodePage
