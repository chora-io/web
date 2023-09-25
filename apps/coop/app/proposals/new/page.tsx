'use client'

// import { Metadata } from 'next'

import SubmitProposal from "@components/proposals/SubmitProposal"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'new',
// }

const ProposalsNewPage = () => (
  <div className={styles.page}>
    <div>
      <h1>
        {"submit proposal"}
      </h1>
      <SubmitProposal />
    </div>
  </div>
)

export default ProposalsNewPage
