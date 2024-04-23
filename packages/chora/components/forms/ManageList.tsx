import * as React from 'react'

import styles from './ManageList.module.css'

const ManageList = ({ label, addItem, removeItem, notEmpty }: any) => (
  <span className={styles.options}>
    <button onClick={addItem}>{label ? `add ${label}` : 'add'}</button>
    {notEmpty && (
      <button onClick={removeItem}>
        {label ? `remove ${label}` : 'remove'}
      </button>
    )}
  </span>
)

export default ManageList
