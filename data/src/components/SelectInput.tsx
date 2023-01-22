import * as React from "react"

import * as styles from "./SelectInput.module.css"

const SelectInput = ({ input, setInput }: any) => (
  <div className={styles.input}>
    <button
      className={input == "form" ? styles.active : null}
      onClick={() => setInput("form")}
    >
      {"form"}
    </button>
    <button
      className={input == "json" ? styles.active : null}
      onClick={() => setInput("json")}
    >
      {"json"}
    </button>
  </div>
)

export default SelectInput
