import * as React from 'react'

import styles from './Result.module.css'

const Result = ({ error, success }: any) => (
  <>
    {error && (
      <div>
        <pre className={styles.error}>{error}</pre>
      </div>
    )}
    {success && (
      <div>
        <pre>{success}</pre>
      </div>
    )}
  </>
)

export default Result
