import * as React from 'react'

import styles from './SelectOptionInput.module.css'

const SelectOptionInput = ({ input, setInput }: any) => (
  <div className={styles.boxOptions}>
    <button
      className={input == 'form' ? styles.active : undefined}
      onClick={() => setInput('form')}
    >
      {'form'}
    </button>
    <button
      className={input == 'json' ? styles.active : undefined}
      onClick={() => setInput('json')}
    >
      {'json'}
    </button>
  </div>
)

export default SelectOptionInput
