import { Metadata } from 'next'

import CreateGeonode from '@components/geonodes/CreateGeonode'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const CreatePage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'create geospatial node'}</h1>
      <CreateGeonode />
    </div>
  </div>
)

export default CreatePage
