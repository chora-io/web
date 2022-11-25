import * as React from "react"
import { useState } from "react"
import { Buffer } from "buffer"

import { Coin } from "@keplr-wallet/proto-types/cosmos/base/v1beta1/coin"
import { PubKey } from "@keplr-wallet/proto-types/cosmos/crypto/secp256k1/keys"
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing"
import { AuthInfo, Fee, TxBody, TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx"
import { Any } from "@keplr-wallet/proto-types/google/protobuf/any"
import { BroadcastMode, SignDoc } from "@keplr-wallet/types"

import { MsgAnchor } from "../../../api/regen/data/v1/tx"
import {
  ContentHash,
  ContentHash_Graph,
  DigestAlgorithm,
  GraphCanonicalizationAlgorithm,
  GraphMerkleTree,
  RawMediaType,
} from "../../../api/regen/data/v1/types"

import * as styles from "./MsgAnchor.module.css"

const MsgAnchorView = () => {

  // form input
  const [hash, setHash] = useState<string>("")
  const [digest, setDigest] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [canon, setCanon] = useState<string>("")
  const [merkle, setMerkle] = useState<string>("")
  const [mediaType, setMediaType] = useState<string>("")

  // response and error
  const [response, setResponse] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()

    let msg: MsgAnchor
    let encoder = new TextEncoder()

    if (type == "graph") {
      msg = MsgAnchor.fromJSON({
        $type: "regen.data.v1.MsgAnchor",
        sender: "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx", // TODO
        contentHash: {
          $type: "regen.data.v1.ContentHash",
          graph: {
            $type: "regen.data.v1.ContentHash.Graph",
            hash:  encoder.encode(hash),
            digestAlgorithm:  DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256, // TODO
            canonicalizationAlgorithm: GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015, // TODO
            merkleTree: GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED, // TODO
          }
        },
      })
    } else if (type == "raw") {
      msg = MsgAnchor.fromJSON({
        $type: "regen.data.v1.MsgAnchor",
        sender: "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx", // TODO
        contentHash: {
          $type: "regen.data.v1.ContentHash",
          raw: {
            $type: "regen.data.v1.ContentHash.Raw",
            hash:  encoder.encode(hash),
            digestAlgorithm:  DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256, // TODO
            mediaType: RawMediaType.UNRECOGNIZED, // TODO
          }
        },
      })
    } else {
      setError("data type is required")
      return // exit on error
    }

    // TODO: refactor connect wallet state
    const chainId = "regen-redwood-1"

    // TODO: refactor connect wallet state
    const signer = "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx"

    const msgValue = Buffer.from(JSON.stringify(msg))

    const msgAny = Any.encode({
      typeUrl: `/${msg.$type}`,
      value: msgValue,
    }).finish()

    const msgAnyString = Buffer.from(JSON.stringify(msgAny)).toString('base64')

    const txBody = TxBody.fromJSON({
      messages: [
        {
          typeUrl: `/${msg.$type}`,
          value: msgAnyString,
        },
      ],
      memo: "test",
      timeoutHeight: "0",
      extensionOptions: undefined,
      nonCriticalExtensionOptions: undefined
    })

    const bodyBytes = TxBody.encode(txBody).finish()

    const authInfo = AuthInfo.fromJSON({
      signerInfos: [
        {
          publicKey: undefined,
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_DIRECT
            },
            multi: undefined,
          },
          sequence: "1"
        }
      ],
      fee: {
        gasLimit: "0",
        payer: "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx",
        granter: ""
      }
    })

    const authInfoBytes = AuthInfo.encode(authInfo).finish()

    // TODO: fetch account number
    const accountNumber = 1

    const signDoc: SignDoc = { bodyBytes, authInfoBytes, chainId, accountNumber }

    window?.keplr?.signDirect(chainId, signer, signDoc).then(signResponse => {
      console.log("sign success", signResponse)

      const signedTx = TxRaw.encode({
        bodyBytes: TxBody.encode(
          TxBody.fromPartial({
            messages: [ // TODO
              {
                typeUrl: msg.$type,
                value: MsgAnchor.encode({
                  $type: "regen.data.v1.MsgAnchor",
                  sender: "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx", // TODO
                  contentHash: ContentHash.encode({
                    $type: "regen.data.v1.ContentHash",
                    graph: ContentHash_Graph.encode({
                      $type: "regen.data.v1.ContentHash.Graph",
                      hash:  encoder.encode(hash),
                      digestAlgorithm:  DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256, // TODO
                      canonicalizationAlgorithm: GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015, // TODO
                      merkleTree: GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED, // TODO
                    }).finish()
                  }).finish(),
                }).finish(),
              },
            ],
            memo: "test", // signResponse.signed.memo,
            extensionOptions: undefined,
            nonCriticalExtensionOptions: undefined,
          })
        ).finish(),
        authInfoBytes: AuthInfo.encode({
          signerInfos: [
            {
              publicKey: {
                typeUrl: "/cosmos.crypto.secp256k1.PubKey",
                value: PubKey.encode({
                  key: Buffer.from(signResponse.signature.pub_key.value, "base64"),
                }).finish(),
              },
              modeInfo: {
                single: {
                  mode: SignMode.SIGN_MODE_DIRECT,
                },
                multi: undefined,
              },
              sequence: "1", // signResponse.signed.sequence,
            },
          ],
          fee: Fee.fromPartial({
            amount: Coin.encode({
              denom: "uregen",
              amount: "0",
            }).finish(), // signResponse.signed.fee.amount as Coin[],
            gasLimit: "0", // signResponse.signed.fee.gas,
            payer: "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx", // signResponse.signed.fee["feePayer"]
          }),
        }).finish(),
        signatures: [
            Buffer.from(signResponse.signature.signature, "base64"),
        ],
      }).finish()

      console.log("signedTx", signedTx)

      const mode = "sync" as BroadcastMode

      window?.keplr?.sendTx(chainId, signedTx, mode).then(res => {
        console.log("send success", res)
        setResponse(JSON.stringify(res, null, "\t"))

      }).catch(err => {
        console.log("send error", err.message)
        setError("send error: " + err.message)
      })

    }).catch(err => {
      console.log("sign error", err.message)
      setError("sign error: " + err.message)
    })
  }

  return (
    <>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="hash">
            {"hash"}
            <input
              id="hash"
              value={hash}
              onChange={event => setHash(event.target.value)}
            />
          </label>
          <label htmlFor="digest">
            {"digest algorithm"}
            <select
              id="digest"
              value={digest}
              onChange={event => setDigest(event.target.value)}
            >
              <option>
                {"unspecified"}
              </option>
              <option value="DIGEST_ALGORITHM_BLAKE2B_256">
                {"BLAKE2b-256"}
              </option>
            </select>
          </label>
          <label htmlFor="type">
            {"data type"}
            <select
              id="type"
              value={type}
              onChange={event => setType(event.target.value)}
            >
              <option>
                {"---select---"}
              </option>
              <option value="graph">
                {"graph"}
              </option>
              <option value="raw">
                {"raw"}
              </option>
            </select>
          </label>
          {type == "graph" &&
            <>
              <label htmlFor="canon">
                {"graph canonicalization algorithm"}
                <select
                  id="canon"
                  value={canon}
                  onChange={event => setCanon(event.target.value)}
                >
                  <option>
                    {"unspecified"}
                  </option>
                  <option value="GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015">
                    {"URDNA2015"}
                  </option>
                </select>
              </label>
              <label htmlFor="merkle">
                {"graph merkle tree type"}
                <select
                  id="merkle"
                  value={merkle}
                  onChange={event => setMerkle(event.target.value)}
                >
                  <option>
                    {"unspecified"}
                  </option>
                </select>
              </label>
            </>
          }
          {type == "raw" &&
            <label htmlFor="media-type">
              {"raw media type"}
              <select
                id="media-type"
                value={mediaType}
                onChange={event => setMediaType(event.target.value)}
              >
                <option>
                  {"unspecified"}
                </option>
                <option value="RAW_MEDIA_TYPE_TEXT_PLAIN">
                  {"TXT"}
                </option>
                <option value="RAW_MEDIA_TYPE_JSON">
                  {"JSON"}
                </option>
                <option value="RAW_MEDIA_TYPE_CSV">
                  {"CSV"}
                </option>
                <option value="RAW_MEDIA_TYPE_XML">
                  {"XML"}
                </option>
                <option value="RAW_MEDIA_TYPE_PDF">
                  {"PDF"}
                </option>
                <option value="RAW_MEDIA_TYPE_TIFF">
                  {"TIFF"}
                </option>
                <option value="RAW_MEDIA_TYPE_JPG">
                  {"JPG"}
                </option>
                <option value="RAW_MEDIA_TYPE_PNG">
                  {"PNG"}
                </option>
                <option value="RAW_MEDIA_TYPE_SVG">
                  {"SVG"}
                </option>
              </select>
            </label>
          }
          <button type="submit">
            {"anchor data"}
          </button>
        </form>
      </div>
      {error != "" && (
        <div className={styles.error}>
          {error}
        </div>
      )}
      {response != "" && (
        <div>
          <pre>
          {response}
          </pre>
        </div>
      )}
    </>
  )
}

export default MsgAnchorView
