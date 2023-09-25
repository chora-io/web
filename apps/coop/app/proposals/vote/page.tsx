'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import VoteOnProposal from "@components/proposals/VoteOnProposal"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'vote',
// }

const VotePage = () => {

  const searchParams = useSearchParams()

  const proposalId = searchParams.get("id")

  return (
    <div className={styles.page}>
      <div>
        <h1>
          {"vote on proposal"}
        </h1>
        <VoteOnProposal
          proposalId={proposalId}
        />
      </div>
    </div>
  )
}

export default VotePage
