'use client'

// import { Metadata } from 'next'
import { useParams } from 'next/navigation'

import VoteOnProposal from '@components/proposals/VoteOnProposal'

import styles from './page.module.css'

// export const metadata: Metadata = {
//   title: 'proposal vote',
// }

const VotePage = () => {
  const { id } = useParams()

  // TODO: valid id, otherwise error

  return (
    <div className={styles.page}>
      <div>
        <h1>{'vote on proposal'}</h1>
        <VoteOnProposal proposalId={id} />
      </div>
    </div>
  )
}

export default VotePage
