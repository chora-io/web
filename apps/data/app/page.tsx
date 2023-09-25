'use client'

// import { Metadata } from 'next'

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'data',
// }

const HomePage = () => (
  <div className={styles.page} style={{ alignItems: "center" }}>
    <div>
      <h1>
        {"data tools and services"}
      </h1>
    </div>
  </div>
)

export default HomePage
