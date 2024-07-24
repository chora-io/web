'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

import ProposalTableRow from './ProposalTableRow'

import styles from './Proposals.module.css'

const queryProposals = '/cosmos/gov/v1/proposals'

const Proposals = () => {
  const { chainInfo } = useContext(WalletContext)

  const [proposals, setProposals] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (chainInfo?.rest) {
      const queryParams = `?pagination.limit=500` // NOTE: default limit 100

      fetch(chainInfo.rest + queryProposals + queryParams)
        .then((res) => res.json())
        .then((data) => {
          setProposals(data.proposals)
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }, [chainInfo?.rest, proposals.length])

  return (
    <div className={styles.box}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'id'}</td>
              <td>{'title'}</td>
              <td>{'status'}</td>
              <td>{'submit time'}</td>
              <td>{'voting start time'}</td>
              <td>{'voting end time'}</td>
              <td>{'more info'}</td>
            </tr>
          </thead>
          <tbody>
            {proposals.length > 0 &&
              proposals.map((p: any, i: number) => (
                <ProposalTableRow index={i} proposal={p} key={i} />
              ))}
          </tbody>
        </table>
      </div>
      <Result error={error} />
    </div>
  )
}

export default Proposals
