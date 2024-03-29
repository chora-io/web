import { PubKey } from '@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys'
import { SignMode } from '@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing'
import {
  AuthInfo,
  TxBody,
  TxRaw,
} from '@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx'
import { BroadcastMode, ChainInfo, SignDoc } from '@keplr-wallet/types'
import { Buffer } from 'buffer'

const queryAccount = '/cosmos/auth/v1beta1/accounts'

// signAndBroadcast signs and broadcasts a transaction
export const signAndBroadcast = async (
  chainInfo: ChainInfo,
  address: string,
  messages: any[],
) => {
  // account information
  let account = undefined

  // fetch account information
  await fetch(chainInfo.rest + '/' + queryAccount + '/' + address)
    .then((res) => res.json())
    .then((res) => {
      // throw error if response includes error code
      if (res.code) {
        throw Error(res.message)
      }

      // throw error if account is undefined
      if (res['account'] === undefined) {
        throw Error('account is undefined')
      }

      // set account information
      account = res['account']
    })
    .catch((err) => {
      throw Error('error fetching account: ' + err.message)
    })

  // throw error if account is undefined
  if (account === undefined) {
    throw Error('error fetching account: account is undefined')
  }

  // transaction body bytes
  const bodyBytes = TxBody.encode({
    messages: messages,
    memo: '',
    timeoutHeight: '0',
    extensionOptions: [],
    nonCriticalExtensionOptions: [],
  }).finish()

  // transaction authority bytes
  const authInfoBytes = AuthInfo.encode({
    signerInfos: [
      {
        publicKey: {
          typeUrl: '/cosmos.crypto.secp256k1.PubKey',
          value: PubKey.encode(account['pub_key']).finish(),
        },
        modeInfo: {
          single: {
            mode: SignMode.SIGN_MODE_DIRECT,
          },
          multi: undefined,
        },
        sequence: account['sequence'],
      },
    ],
    fee: {
      amount: [
        {
          denom: chainInfo.feeCurrencies[0].coinMinimalDenom,
          amount: '0',
        },
      ],
      gasLimit: '200000',
      payer: account['address'],
      granter: '',
    },
  }).finish()

  // transaction sign document
  const signDoc: SignDoc = {
    bodyBytes,
    authInfoBytes,
    chainId: chainInfo.chainId,
    accountNumber: account['account_number'],
  }

  // transaction hash
  let txHash = undefined

  // transaction sign mode (block not supported in cosmos sdk v0.50)
  const mode = 'sync' as BroadcastMode

  // signed transaction
  let signedTx = new Uint8Array(0)

  // sign transaction using sign document
  await window?.keplr
    ?.signDirect(chainInfo.chainId, account['address'], signDoc)
    .then((res) => {
      // encode signed transaction
      signedTx = TxRaw.encode({
        bodyBytes: res.signed.bodyBytes,
        authInfoBytes: res.signed.authInfoBytes,
        signatures: [Buffer.from(res.signature.signature, 'base64')],
      }).finish()
    })
    .catch((err) => {
      throw Error('sign error: ' + err.message)
    })

  // broadcast transaction using signed transaction
  await window?.keplr
    ?.sendTx(chainInfo.chainId, signedTx, mode)
    .then((res) => {
      // convert transaction bytes to hex string
      txHash = Buffer.from(res).toString('hex')
    })
    .catch((err) => {
      throw Error('send error: ' + err.message)
    })

  return txHash
}
