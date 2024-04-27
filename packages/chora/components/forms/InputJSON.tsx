import * as React from 'react'

import styles from './InputJSON.module.css'

const defaultId = 'json-ld'
const defaultLabel = 'json-ld document'

const InputJSON = ({
  id,
  label,
  json,
  disabled,
  placeholder,
  setJson,
  useTemplate,
  showUseTemplate,
}: any) => {
  const handleFormat = (event: any) => {
    event.preventDefault()

    let parsed: any
    try {
      parsed = JSON.parse(json)
    } catch (e) {
      // do nothing
    }
    if (parsed) {
      setJson(JSON.stringify(parsed, null, '  '))
    }
  }

  return (
    <label htmlFor={id ? id : defaultId}>
      {label ? label : defaultLabel}
      {json.length > 0 && (
        <button className={styles.button} onClick={handleFormat}>
          {'format json'}
        </button>
      )}
      {showUseTemplate && json.length === 0 && (
        <button className={styles.button} onClick={useTemplate}>
          {'use template'}
        </button>
      )}
      <textarea
        id={id ? id : defaultId}
        value={json}
        disabled={disabled}
        className={styles.long}
        placeholder={placeholder || '{\n  "@context":""\n}'}
        onChange={(event) => setJson(event.target.value)}
      />
    </label>
  )
}

export default InputJSON
