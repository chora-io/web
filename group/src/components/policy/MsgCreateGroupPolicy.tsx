import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"

import { WalletContext } from "../../contexts/WalletContext"
import { MsgCreateGroupPolicy } from "../../../api/cosmos/group/v1/tx"
import { PercentageDecisionPolicy, ThresholdDecisionPolicy } from "../../../api/cosmos/group/v1/types"
import { signAndBroadcast } from "../../utils/tx"

import InputMetadata from "../InputMetadata"
import InputNumber from "../InputNumber"
import InputPolicy from "../InputPolicy"
import ResultTx from "../ResultTx"

import * as styles from "./MsgCreateGroupPolicy.module.css"

type policy = {
  threshold: string;
  percentage: string;
  windows: {
    votingPeriod: string
    minExecutionPeriod: string
  }
}

const initialPolicy = {
  threshold: "",
  percentage: "",
  windows: {
    votingPeriod: "",
    minExecutionPeriod: "",
  },
}

const MsgCreateGroupPolicyView = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [policy, setPolicy] = useState<policy>(initialPolicy)

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const windows = {
      votingPeriod: {
        seconds: Long.fromString(policy.windows.votingPeriod),
      },
      minExecutionPeriod: {
        seconds: Long.fromString(policy.windows.minExecutionPeriod),
      },
    }

    let decisionPolicy: any

    if (policy.threshold !== "") {
      decisionPolicy = {
        typeUrl: "/cosmos.group.v1.ThresholdDecisionPolicy",
        value: ThresholdDecisionPolicy.encode({
          threshold: policy.threshold,
          windows: windows,
        }).finish(),
      }
    } else if (policy.percentage !== "") {
      decisionPolicy = {
        typeUrl: "/cosmos.group.v1.PercentageDecisionPolicy",
        value: PercentageDecisionPolicy.encode({
          percentage: policy.percentage,
          windows: windows,
        }).finish(),
      }
    }

    const msg = {
      $type: "cosmos.group.v1.MsgCreateGroupPolicy",
      admin: wallet.bech32Address,
      groupId: Long.fromString(id),
      metadata: metadata,
      decisionPolicy: decisionPolicy,
    } as MsgCreateGroupPolicy

    const encMsg = MsgCreateGroupPolicy.encode(msg).finish()

    await signAndBroadcast(chainInfo, wallet.bech32Address, msg, encMsg)
      .then(res => {
        setSuccess(res)
      }).catch(err => {
        setError(err.message)
      })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputNumber
            id="group-id"
            label="group id"
            number={id}
            setNumber={setId}
          />
          <InputMetadata
            id="policy-metadata"
            label="policy metadata"
            metadata={metadata}
            setMetadata={setMetadata}
          />
          <InputPolicy
            label="decision policy"
            policy={policy}
            setPolicy={setPolicy}
          />
          <button type="submit">
            {"submit"}
          </button>
        </form>
      </div>
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </>
  )
}

export default MsgCreateGroupPolicyView
