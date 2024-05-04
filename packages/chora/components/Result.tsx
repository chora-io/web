import * as React from 'react'

import styles from './Result.module.css'

const Result = ({ error, success }: any) =>
  error || success ? (
    <div className={styles.boxText}>
      {error && <pre className={styles.error}>{error}</pre>}
      {success && <pre>{success}</pre>}
    </div>
  ) : (
    <></>
  )

export default Result
