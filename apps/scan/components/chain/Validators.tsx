import { useEffect, useState } from 'react'

import { Result } from 'chora/components'

import Validator from './Validator'

import styles from './Validators.module.css'

const queryValidators = '/cosmos/staking/v1beta1/validators'

const Validators = ({ rest }: any) => {
  const [validators, setValidators] = useState<any[]>([])
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    // fetch latest block header data
    fetch(rest + queryValidators)
      .then((res) => res.json())
      .then((data) => {
        // sort validators by tokens status
        const sort1 = data['validators'].sort((a: any, b: any) => {
          return Number(b['tokens']) - Number(a['tokens'])
        })

        // sort validators by jailed status
        const sort2 = sort1.sort((a: any, b: any) => {
          return Number(a['jailed']) - Number(b['jailed'])
        })

        setValidators(sort2)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [validators.length])

  return (
    <div className={styles.box}>
      <div>
        <h2>{'validators'}</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>{'moniker'}</td>
              <td>{'tokens'}</td>
              <td>{'delegator shares'}</td>
              <td>{'commission rate'}</td>
              <td>{'max commission rate'}</td>
              <td>{'max change rate'}</td>
            </tr>
          </thead>
          <tbody>
            {validators.length > 0 &&
              validators.map((v: any, i: number) => (
                <Validator index={i} validator={v} key={i} />
              ))}
          </tbody>
        </table>
        {error && (
          <div className={styles.result}>
            <Result error={error} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Validators
