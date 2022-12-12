import * as React from "react"
import { useContext, useState } from "react"
import { Buffer } from "buffer"
import * as Long from "long"

import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing"
import { AuthInfo, TxBody, TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx"
import { BroadcastMode, SignDoc } from "@keplr-wallet/types"

import { WalletContext } from "../../context/WalletContext"
import { MsgUpdateGroupAdmin } from "../../../api/cosmos/group/v1/tx"
import InputNumber from "../InputNumber"
import InputAddress from "../InputAddress"

import * as styles from "./MsgUpdateGroupAdmin.module.css"

const queryAccount = "/cosmos/auth/v1beta1/accounts"
const queryTx = "/cosmos/tx/v1beta1/txs"

const MsgUpdateGroupAdminView = () => {

  // @ts-ignore
  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [id, setId] = useState<string>("")
  const [admin, setAdmin] = useState<string>("")

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

    const msg = {
      $type: "cosmos.group.v1.MsgUpdateGroupAdmin",
      admin: sender,
      groupId: Long.fromString(id),
      newAdmin: admin,
    } as MsgUpdateGroupAdmin

    const bodyBytes = TxBody.encode({
      messages: [
        {
          typeUrl: `/${msg.$type}`,
          value: MsgUpdateGroupAdmin.encode(msg).finish(),
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
          <InputNumber
            id="group-id"
            label="group id"
            number={id}
            setNumber={setId}
          />
          <InputAddress
            id="new-admin"
            label="new admin"
            address={admin}
            setAddress={setAdmin}
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

export default MsgUpdateGroupAdminView
