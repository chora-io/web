import * as React from "react"

import * as styles from "./InputJSON.module.css"

const InputJSON = ({ json, placeholder, setJson, useTemplate }: any) => (
  <label htmlFor="json">
    {"json-ld"}
    <button className={styles.button} onClick={useTemplate}>
      {json.length > 0 ? "reset template" : "use template"}
    </button>
    <textarea
      id="json"
      value={json}
      className={styles.long}
      placeholder={placeholder || "{}"}
      onChange={event => setJson(event.target.value)}
    />
  </label>
)

export default InputJSON
