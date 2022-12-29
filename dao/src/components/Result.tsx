import * as React from "react"

import * as styles from "./Result.module.css"

const Result = ({ error, success }: any) => (
  <>
    {error !== undefined && error !== "" && (
      <div className={styles.error}>
        {error}
      </div>
    )}
    {success !== undefined && success !== "" && (
      <div>
        <pre>
          {success}
        </pre>
      </div>
    )}
  </>
)

export default Result
