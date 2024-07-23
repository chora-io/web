'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useContext, useEffect, useState } from 'react'

import ValidatorTableRow from './ValidatorTableRow'

import styles from './Validators.module.css'

const queryValidators = '/cosmos/staking/v1beta1/validators'

const Validators = () => {
  const { chainInfo } = useContext(WalletContext)

  const [validators, setValidators] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (chainInfo?.rest) {
      const queryParams = `?pagination.limit=500` // NOTE: default limit 100

      fetch(chainInfo.rest + queryValidators + queryParams)
        .then((res) => res.json())
        .then((data) => {
          // sort validators by tokens status
          const sort1 = data.validators.sort((a: any, b: any) => {
            return Number(b.tokens) - Number(a.tokens)
          })

          // sort validators by jailed status
          const sort2 = sort1.sort((a: any, b: any) => {
            return Number(a.jailed) - Number(b.jailed)
          })

          setValidators(sort2)
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }, [chainInfo?.rest, validators.length])

  return (
    <div className={styles.box}>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'#'}</td>
              <td>{'moniker'}</td>
              <td>{'tokens'}</td>
              <td>{'delegator shares'}</td>
              <td>{'commission rate'}</td>
              <td>{'max commission rate'}</td>
              <td>{'max change rate'}</td>
              <td>{'more info'}</td>
            </tr>
          </thead>
          <tbody>
            {validators.length > 0 &&
              validators.map((v: any, i: number) => (
                <ValidatorTableRow index={i} validator={v} key={i} />
              ))}
          </tbody>
        </table>
      </div>
      <Result error={error} />
    </div>
  )
}

export default Validators
