import * as React from "react"
import { useEffect, useState } from "react"

import * as styles from "./Validators.module.css"

const queryValidators = "/cosmos/staking/v1beta1/validators"

const Validators = ({ rest }) => {

  const [validators, setValidators] = useState<any[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {

    // fetch latest block header data
    fetch(rest + queryValidators)
      .then(res => res.json())
      .then(data => {

        // sort validators by jailed status
        const sorted = data.validators.sort((a, b) => {
          return Number(a.jailed) - Number(b.jailed)
        })

        setValidators(sorted)
      })
      .catch(err => {
        setError(err.message)
      })
  }, [validators.length])

  return (
    <div>
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <td>
                {"moniker"}
              </td>
              <td>
                {"tokens"}
              </td>
              <td>
                {"delegator shares"}
              </td>
              <td>
                {"commission rate"}
              </td>
              <td>
                {"max commission rate"}
              </td>
              <td>
                {"max change rate"}
              </td>
              <td>
                {"jailed"}
              </td>
            </tr>
          </thead>
          <tbody>
            {validators.length > 0 && validators.map((v, i) => (
              <tr key={i} className={v.jailed ? styles.jailed : null}>
                <td>
                  {v.description.moniker}
                </td>
                <td>
                  {v.tokens}
                </td>
                <td>
                  {Number(v.delegator_shares).toFixed()}
                </td>
                <td>
                  {Number(v.commission.commission_rates.rate).toFixed(2)}
                </td>
                <td>
                  {Number(v.commission.commission_rates.max_rate).toFixed(2)}
                </td>
                <td>
                  {Number(v.commission.commission_rates.max_change_rate).toFixed(2)}
                </td>
                <td>
                  {v.jailed.toString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.container}>
        {error != "" && (
          <div className={styles.error}>
            {error}
          </div>
        )}
      </div>
    </div>
  )
}

export default Validators
