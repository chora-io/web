import * as React from "react"

import * as styles from "./SelectInput.module.css"

const SelectInput = ({ input, setInput, setError, setSuccess }: any) => (
  <div className={styles.input}>
    <button
      className={input == "form" ? styles.active : null}
      onClick={() => {
        setInput("form")
        setError("")
        setSuccess("")
      }}
    >
      {"form"}
    </button>
    <button
      className={input == "json" ? styles.active : null}
      onClick={() => {
        setInput("json")
        setError("")
        setSuccess("")
      }}
    >
      {"json"}
    </button>
  </div>
)

export default SelectInput
