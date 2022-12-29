import { Buffer } from "buffer"

import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing"
import { AuthInfo, TxBody, TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx"
import { BroadcastMode, SignDoc } from "@keplr-wallet/types"

const queryAccount = "/cosmos/auth/v1beta1/accounts"

// signAndBroadcast signs and broadcasts a transaction
export const signAndBroadcast = async (chainInfo, address, msg, encMsg) => {

  // account information
  let account = undefined

  // fetch account information
  await fetch(chainInfo.rest + "/" + queryAccount + "/" + address)
    .then(res => res.json())
    .then(res => {

      // throw error if response includes error code
      if (res.code !== undefined) {
        throw Error(res.message)
      }

      // set account information
      account = res.account

    })
    .catch(err => {
      throw Error("error fetching account: " + err.message)
    })

  // transaction body bytes
  const bodyBytes = TxBody.encode({
    messages: [
      {
        typeUrl: `/${msg.$type}`,
        value: encMsg,
      },
    ],
    memo: "",
    timeoutHeight: "0",
    extensionOptions: [],
    nonCriticalExtensionOptions: [],
  }).finish()

  // transaction authority bytes
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
        sequence: account.sequence,
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
      payer: account.address,
      granter: "",
    }
  }).finish()

  // transaction sign document
  const signDoc: SignDoc = {
    bodyBytes,
    authInfoBytes,
    chainId: chainInfo.chainId,
    accountNumber: account.number,
  }

  // transaction hash
  let txHash = undefined

  // transaction sign mode
  const mode = "block" as BroadcastMode

  // signed transaction
  let signedTx: Uint8Array

  // sign transaction using sign document
  await window?.keplr?.signDirect(chainInfo.chainId, account.address, signDoc).then(res => {

    // encode signed transaction
    signedTx = TxRaw.encode({
      bodyBytes: res.signed.bodyBytes,
      authInfoBytes: res.signed.authInfoBytes,
      signatures: [Buffer.from(res.signature.signature, "base64")],
    }).finish()

  }).catch(err => {
    throw Error("sign error: " + err.message)
  })

  // broadcast transaction using signed transaction
  await window?.keplr?.sendTx(chainInfo.chainId, signedTx, mode).then(res => {

    // convert transaction bytes to hex string
    txHash = Buffer.from(res).toString("hex")

  }).catch(err => {
    throw Error("send error: " + err.message)
  })

  return txHash
}
