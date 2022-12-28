import * as React from "react"

import * as styles from "./Result.module.css"

const Result = ({ error, success }: any) => (
  <>
    {error != "" && (
      <div className={styles.error}>
        {error}
      </div>
    )}
    {success != "" && (
      <div>
        <pre>
          {success}
        </pre>
      </div>
    )}
  </>
)

export default Result
