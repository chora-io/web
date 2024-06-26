import { Metadata } from 'next'

import ConvertData from '@components/convert/ConvertData'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora data',
}

const ConvertPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'convert data'}</h1>
      <ConvertData />
    </div>
  </div>
)

export default ConvertPage
