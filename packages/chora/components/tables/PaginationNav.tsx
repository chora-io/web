import * as React from 'react'

import styles from './PaginationNav.module.css'

const PaginationNav = ({ length, limit, offset, setOffset }: any) => {
  const pageNumber = () => {
    return offset / limit + 1
  }

  return (
    <div className={styles.navigation}>
      {offset > 0 && (
        <button
          className={styles.button}
          onClick={() => setOffset(offset - limit)}
        >
          {'prev page'}
        </button>
      )}
      <span>{'page ' + pageNumber()}</span>
      {length === limit && (
        <button
          className={styles.button}
          onClick={() => setOffset(offset + limit)}
        >
          {'next page'}
        </button>
      )}
    </div>
  )
}

export default PaginationNav
