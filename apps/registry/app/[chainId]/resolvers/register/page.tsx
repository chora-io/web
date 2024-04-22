import { Metadata } from 'next'

import RegisterResolver from '@components/resolvers/RegisterResolver'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'chora registry',
}

const RegisterPage = () => (
  <div className={styles.page}>
    <div>
      <h1>{'register resolver'}</h1>
      <RegisterResolver />
    </div>
  </div>
)

export default RegisterPage
