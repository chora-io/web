import * as React from 'react'

import styles from './InputJSON.module.css'

const InputJSON = ({
  id,
  label,
  json,
  placeholder,
  setJson,
  useTemplate,
  showUseTemplate,
}: any) => (
  <label htmlFor={id ? id : 'json'}>
    {label ? label : 'json object'}
    {showUseTemplate && (
      <button className={styles.button} onClick={useTemplate}>
        {json.length > 0 ? 'reset template' : 'use template'}
      </button>
    )}
    <textarea
      id={id ? id : 'json'}
      value={json}
      className={styles.long}
      placeholder={placeholder || '{}'}
      onChange={(event) => setJson(event.target.value)}
    />
  </label>
)

export default InputJSON
