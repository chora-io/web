'use client'

import styles from './GroupsNav.module.css'

const Groups = ({ groups, maxItems, offset, setOffset }: any) => {
  const pageNumber = () => {
    return offset / maxItems + 1
  }

  return (
    <div className={styles.navigation}>
      {offset > 0 && (
        <button
          className={styles.button}
          onClick={() => setOffset(offset - maxItems)}
        >
          {'prev page'}
        </button>
      )}
      <span>{'page ' + pageNumber()}</span>
      {groups && groups.length === maxItems && (
        <button
          className={styles.button}
          onClick={() => setOffset(offset + maxItems)}
        >
          {'next page'}
        </button>
      )}
    </div>
  )
}

export default Groups
