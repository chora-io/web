import * as React from "react"
import { useContext, useState } from "react"
import * as Long from "long"

import { WalletContext } from "chora"
import { signAndBroadcast } from "chora/utils/tx"
import InputIRI from "chora/components/InputIRI"
import ResultTx from "chora/components/ResultTx"

import { MsgCreateGroupWithPolicy } from "../../../api/cosmos/group/v1/tx"
import { PercentageDecisionPolicy, ThresholdDecisionPolicy } from "../../../api/cosmos/group/v1/types"

import InputMembers from "../InputMembers"
import InputPolicy from "../InputPolicy"

import * as styles from "./MsgCreateGroupWithPolicy.module.css"

type member = {
  address: string;
  weight: string;
  metadata: string;
}

const member = {
  address: "",
  weight: "",
  metadata: "",
}

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

const MsgCreateGroupWithPolicyView = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // form input
  const [members, setMembers] = useState<member[]>([member])
  const [metadata, setMetadata] = useState<string>("")
  const [policyMetadata, setPolicyMetadata] = useState<string>("")
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
      $type: "cosmos.group.v1.MsgCreateGroupWithPolicy",
      admin: wallet.bech32Address,
      members: members,
      groupMetadata: metadata,
      groupPolicyMetadata: policyMetadata,
      groupPolicyAsAdmin: false,
      decisionPolicy: decisionPolicy,
    } as MsgCreateGroupWithPolicy

    const encMsg = MsgCreateGroupWithPolicy.encode(msg).finish()

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
          <InputIRI
            id="create-group-with-policy-metadata"
            label="metadata"
            network={network}
            iri={metadata}
            setIri={setMetadata}
          />
          <InputMembers
            members={members}
            setMembers={setMembers}
          />
          <InputIRI
            id="create-group-with-policy-policy-metadata"
            label="policy metadata"
            network={network}
            iri={policyMetadata}
            setIri={setPolicyMetadata}
          />
          <InputPolicy
            id="create-group-with-policy-decision-policy"
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

export default MsgCreateGroupWithPolicyView