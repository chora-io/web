import * as React from "react"
import { useState } from "react"

import { BroadcastMode, SignDoc } from "@keplr-wallet/types"
import { AuthInfo, TxBody } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx"
import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing"

import { MsgAnchor } from "../../../api/regen/data/v1/tx"
import {
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

    let encoder = new TextEncoder()

    let msg: MsgAnchor
    if (type == "graph") {
      msg = {
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
      }
    } else if (type == "raw") {
      msg = {
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
      }
    } else {
      setError("data type is required")
      return // exit on error
    }

    // TODO: refactor connect wallet state
    const chainId = "regen-redwood-1"

    // TODO: refactor connect wallet state
    const signer = "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx"

    const txBody: TxBody = {
      // @ts-ignore // TODO ?
      messages: [msg],
      memo: "test memo",
      timeoutHeight: "0",
      extensionOptions: [],
      nonCriticalExtensionOptions: []
    }

    // TODO: Request failed with status code 501 / Request rejected
    // body_bytes is protobuf serialization of a TxBody that matches the
    // representation in TxRaw.
    const bodyBytes = new TextEncoder().encode(JSON.stringify(txBody))

    const authInfo: AuthInfo = {
      signerInfos: [
        {
          publicKey: undefined,
          modeInfo: {
            single: {
              mode: SignMode.SIGN_MODE_DIRECT
            },
            multi: {
              bitarray: undefined,
              modeInfos: [],
            }
          },
          sequence: ""
        }
      ],
      fee: {
        amount: [
          {
            denom: "uregen",
            amount: "0"
          }
        ],
        gasLimit: "0",
        payer: "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx",
        granter: ""
      }
    }

    // TODO: Request failed with status code 501 / Request rejected
    // auth_info_bytes is a protobuf serialization of an AuthInfo that matches the
    // representation in TxRaw.
    const authInfoBytes = new TextEncoder().encode(JSON.stringify(authInfo))

    // TODO: fetch account number
    const accountNumber = 1

    const signDoc: SignDoc = { bodyBytes, authInfoBytes, chainId, accountNumber }

    window?.keplr?.signDirect(chainId, signer, signDoc).then(tx => {
      setResponse(JSON.stringify(tx, null, "\t"))

      // TODO: generate tx bytes
      const txBytes =  new TextEncoder().encode(JSON.stringify(tx))

      // TODO: choose broadcast mode
      const mode = "sync" as BroadcastMode

      window?.keplr?.sendTx(chainId, txBytes, mode).then(res => {
        console.log("send tx success", res)
        setResponse(JSON.stringify(res, null, "\t"))
      }).catch(err => {
        console.log(err.message)
        setError(err.message)
      })

    }).catch(err => {
      console.log(err.message)
      setError(err.message)
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
