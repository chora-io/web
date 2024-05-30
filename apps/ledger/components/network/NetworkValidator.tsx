'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { formatTimestamp } from 'chora/utils'
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'

import styles from './NetworkValidator.module.css'

const queryValidator = '/cosmos/staking/v1beta1/validators'

const NetworkValidator = () => {
  const { address } = useParams()

  const { chainInfo } = useContext(WalletContext)

  const [validator, setValidator] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!validator && chainInfo?.rest) {
      fetch(chainInfo.rest + queryValidator + '/' + address)
        .then((res) => res.json())
        .then((data) => setValidator(data.validator))
        .catch((err) => {
          setError(err.message)
        })
    }
  }, [chainInfo?.rest, validator])

  return validator ? (
    <>
      {error && (
        <div className={styles.box}>
          <Result error={error} />
        </div>
      )}
      <div className={styles.box}>
        <div className={styles.boxText}>
          <h3>{'moniker'}</h3>
          <p>{(validator && validator.description.moniker) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'address'}</h3>
          <p>{(validator && validator['operator_address']) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'description'}</h3>
          <p>{(validator && validator.description.details) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'website'}</h3>
          <p>
            {(validator && validator.description.website && (
              <a href={validator.description.website} target="_blank">
                {validator.description.website}
              </a>
            )) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'security contact'}</h3>
          <p>
            {(validator && validator.description['security_contact']) || 'NA'}
          </p>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxText}>
          <h3>{'tokens'}</h3>
          <p>{(validator && validator.tokens) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'delegator shares'}</h3>
          <p>
            {(validator && Number(validator['delegator_shares']).toFixed()) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'min self-delegation'}</h3>
          <p>
            {(validator &&
              Number(validator['min_self_delegation']).toFixed()) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'commission rate'}</h3>
          <p>
            {(validator &&
              Number(validator.commission['commission_rates'].rate).toFixed(
                2,
              )) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'max commission rate'}</h3>
          <p>
            {(validator &&
              Number(
                validator.commission['commission_rates']['max_rate'],
              ).toFixed(2)) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'max commission change rate'}</h3>
          <p>
            {(validator &&
              Number(
                validator.commission['commission_rates']['max_change_rate'],
              ).toFixed(2)) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'commission rate updated'}</h3>
          <p>
            {(validator &&
              formatTimestamp(validator.commission['update_time'])) ||
              'NA'}
          </p>
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.boxText}>
          <h3>{'status'}</h3>
          <p>{(validator && validator.status) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'jailed'}</h3>
          <p>{(validator && validator.jailed.toString()) || 'NA'}</p>
        </div>
        <div className={styles.boxText}>
          <h3>{'unbonding time'}</h3>
          <p>
            {(validator && formatTimestamp(validator['unbonding_time'])) ||
              'NA'}
          </p>
        </div>
        <div className={styles.boxText}>
          <h3>{'unbonding height'}</h3>
          <p>{(validator && validator['unbonding_height']) || 'NA'}</p>
        </div>
      </div>
    </>
  ) : (
    <></>
  )
}

export default NetworkValidator
