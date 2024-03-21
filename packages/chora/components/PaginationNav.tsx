import * as React from 'react'

import styles from './PaginationNav.module.css'

const PaginationNav = ({ length, maxLength, offset, setOffset }: any) => {
  const pageNumber = () => {
    return offset / maxLength + 1
  }

  return (
    <div className={styles.navigation}>
      {offset > 0 && (
        <button
          className={styles.button}
          onClick={() => setOffset(offset - maxLength)}
        >
          {'prev page'}
        </button>
      )}
      <span>{'page ' + pageNumber()}</span>
      {length === maxLength && (
        <button
          className={styles.button}
          onClick={() => setOffset(offset + maxLength)}
        >
          {'next page'}
        </button>
      )}
    </div>
  )
}

export default PaginationNav
