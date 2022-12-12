import * as React from "react"
import { useContext, useState } from "react"
import { Buffer } from "buffer"
import * as Long from "long"

import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing"
import { AuthInfo, TxBody, TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx"
import { BroadcastMode, SignDoc } from "@keplr-wallet/types"

import { WalletContext } from "../../context/WalletContext"
import { MsgUpdateGroupPolicyDecisionPolicy } from "../../../api/cosmos/group/v1/tx"
import { PercentageDecisionPolicy, ThresholdDecisionPolicy } from "../../../api/cosmos/group/v1/types"
import InputAddress from "../InputAddress"
import InputPolicy from "../InputPolicy"

import * as styles from "./MsgCreateGroupPolicy.module.css"

const queryAccount = "/cosmos/auth/v1beta1/accounts"
const queryTx = "/cosmos/tx/v1beta1/txs"

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

const MsgUpdateGroupPolicyDecisionPolicyView = () => {

  // @ts-ignore
  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [address, setAddress] = useState<string>("")
  const [policy, setPolicy] = useState<policy>(initialPolicy)

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    const sender = wallet.bech32Address

    let accountSequence: string
    let accountNumber: number

    // fetch account number and sequence
    await fetch(chainInfo.rest + queryAccount + "/" + sender)
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError("error fetching account: " + data.message)
        } else {
          accountNumber = data.account.account_number
          accountSequence = data.account.sequence
        }
      })
      .catch(err => {
        setError("error fetching account: " + err.message)
      })

    // @ts-ignore
    if (accountSequence == undefined || accountNumber == undefined) {
      return // exit if fetch account unsuccessful
    }

    const windows = {
      votingPeriod: {
        seconds: Long.fromString(policy.windows.votingPeriod),
      },
      minExecutionPeriod: {
        seconds: Long.fromString(policy.windows.minExecutionPeriod),
      },
    }

    let decisionPolicy: any

    if (policy.threshold != "") {
      decisionPolicy = {
        typeUrl: "/cosmos.group.v1.ThresholdDecisionPolicy",
        value: ThresholdDecisionPolicy.encode({
          threshold: policy.threshold,
          windows: windows,
        }).finish(),
      }
    } else if (policy.percentage != "") {
      decisionPolicy = {
        typeUrl: "/cosmos.group.v1.PercentageDecisionPolicy",
        value: PercentageDecisionPolicy.encode({
          percentage: policy.percentage,
          windows: windows,
        }).finish(),
      }
    }

    const msg = {
      $type: "cosmos.group.v1.MsgUpdateGroupPolicyDecisionPolicy",
      admin: sender,
      groupPolicyAddress: address,
      decisionPolicy: decisionPolicy,
    } as MsgUpdateGroupPolicyDecisionPolicy

    const bodyBytes = TxBody.encode({
      messages: [
        {
          typeUrl: `/${msg.$type}`,
          value: MsgUpdateGroupPolicyDecisionPolicy.encode(msg).finish(),
        },
      ],
      memo: "",
      timeoutHeight: "0",
      extensionOptions: [],
      nonCriticalExtensionOptions: [],
    }).finish()

    const authInfoBytes = AuthInfo.encode({
      signerInfos: [
        {
          publicKey: undefined,
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_DIRECT
            },
            multi: undefined,
          },
          sequence: accountSequence,
        },
      ],
      fee: {
        amount: [
          {
            denom: chainInfo.feeCurrencies[0].coinMinimalDenom,
            amount: "0",
          },
        ],
        gasLimit: "200000",
        payer: sender,
        granter: "",
      }
    }).finish()

    const signDoc: SignDoc = {
      bodyBytes,
      authInfoBytes,
      chainId: chainInfo.chainId,
      accountNumber,
    }

    window?.keplr?.signDirect(chainInfo.chainId, sender, signDoc).then(res => {

      const mode = "block" as BroadcastMode
      const signedTx = TxRaw.encode({
        bodyBytes: res.signed.bodyBytes,
        authInfoBytes: res.signed.authInfoBytes,
        signatures: [Buffer.from(res.signature.signature, "base64")],
      }).finish()

      window?.keplr?.sendTx(chainInfo.chainId, signedTx, mode).then(res => {
        setSuccess(Buffer.from(res).toString("hex"))

      }).catch(err => {
        setError("send error: " + err.message)
      })

    }).catch(err => {
      setError("sign error: " + err.message)
    })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <InputAddress
            id="policy-address"
            label="policy address"
            long={true}
            address={address}
            setAddress={setAddress}
          />
          <InputPolicy
            label="update"
            policy={policy}
            setPolicy={setPolicy}
          />
          <button type="submit">
            {"submit"}
          </button>
        </form>
      </div>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {success != "" && (
        <div>
          <pre>
            <a href={chainInfo.rest + queryTx + "/" + success}>
              {chainInfo.rest + queryTx + "/" + success}
            </a>
          </pre>
        </div>
      )}
    </>
  )
}

export default MsgUpdateGroupPolicyDecisionPolicyView
