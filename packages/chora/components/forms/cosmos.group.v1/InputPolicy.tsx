import {
  DecisionPolicyWindows,
  PercentageDecisionPolicy,
  ThresholdDecisionPolicy,
} from 'cosmos/api/cosmos/group/v1/types'
import * as Long from 'long'
import * as React from 'react'
import { useEffect, useState } from 'react'

import { InputNumber } from '..'
import { SelectPolicyType } from '.'

const defaultId = 'policy'
const defaultLabel = 'policy'

const thresholdPlaceholder = '1'
const percentagePlaceholder = '0.5'
const periodPlaceholder = '3600'

const InputPolicy = ({ id, label, initPolicy, setPolicy }: any) => {
  const [type, setType] = useState<string>('threshold')
  const [threshold, setThreshold] = useState<string>('')
  const [percentage, setPercentage] = useState<string>('')
  const [votingPeriod, setVotingPeriod] = useState<string>('')
  const [minExecutionPeriod, setMinExecutionPeriod] = useState<string>('')

  useEffect(() => {
    setPolicy(undefined)
  }, [type])

  useEffect(() => {
    const w = {
      $type: 'cosmos.group.v1.DecisionPolicyWindows',
      votingPeriod: {
        seconds: Long.fromString(votingPeriod || '0'),
      },
      minExecutionPeriod: {
        seconds: Long.fromString(minExecutionPeriod || '0'),
      },
    } as DecisionPolicyWindows

    let p: any

    if (type === 'threshold') {
      p = {
        typeUrl: '/cosmos.group.v1.ThresholdDecisionPolicy',
        value: ThresholdDecisionPolicy.encode({
          $type: 'cosmos.group.v1.ThresholdDecisionPolicy',
          threshold: threshold,
          windows: w,
        }).finish(),
      }
    }

    if (type === 'percentage') {
      p = {
        typeUrl: '/cosmos.group.v1.PercentageDecisionPolicy',
        value: PercentageDecisionPolicy.encode({
          $type: 'cosmos.group.v1.PercentageDecisionPolicy',
          percentage: percentage,
          windows: w,
        }).finish(),
      }
    }

    setPolicy(p)
  }, [threshold, percentage, votingPeriod, minExecutionPeriod])

  return (
    <>
      <SelectPolicyType
        id={(id || defaultId) + '-type'}
        type={type}
        initType={
          initPolicy &&
          initPolicy['decision_policy']['@type'] ===
            '/cosmos.group.v1.ThresholdDecisionPolicy'
            ? 'threshold'
            : 'percentage'
        }
        setType={setType}
      />
      {type == 'threshold' ? (
        <InputNumber
          id={(id || defaultId) + '-threshold'}
          label={(label || defaultLabel) + ' threshold'}
          placeholder={thresholdPlaceholder}
          number={threshold}
          initNumber={initPolicy && initPolicy['decision_policy'].threshold}
          setNumber={setThreshold}
        />
      ) : (
        <InputNumber
          id={(id || defaultId) + '-percentage'}
          label={(label || defaultLabel) + ' percentage'}
          placeholder={percentagePlaceholder}
          number={percentage}
          initNumber={initPolicy && initPolicy['decision_policy'].percentage}
          setNumber={setPercentage}
        />
      )}
      <InputNumber
        id={(id || defaultId) + '-voting-period'}
        label={(label || defaultLabel) + ' voting period'}
        placeholder={periodPlaceholder}
        number={votingPeriod}
        initNumber={
          initPolicy &&
          initPolicy['decision_policy'].windows['voting_period'].replace(
            's',
            '',
          )
        }
        setNumber={setVotingPeriod}
      />
      <InputNumber
        id={(id || defaultId) + '-min-execution-period'}
        label={(label || defaultLabel) + ' min execution period'}
        placeholder={periodPlaceholder}
        number={minExecutionPeriod}
        initNumber={
          initPolicy &&
          initPolicy['decision_policy'].windows['min_execution_period'].replace(
            's',
            '',
          )
        }
        setNumber={setMinExecutionPeriod}
      />
    </>
  )
}

export default InputPolicy
