import * as React from "react"
import { useContext, useState } from "react"
import { Buffer } from "buffer"

import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing"
import { AuthInfo, Fee, TxBody, TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx"
import { BroadcastMode, SignDoc } from "@keplr-wallet/types"

import { WalletContext } from "../../context/wallet"
import { MsgAnchor } from "../../../api/regen/data/v1/tx"
import {
  DigestAlgorithm,
  GraphCanonicalizationAlgorithm,
  GraphMerkleTree,
  RawMediaType,
} from "../../../api/regen/data/v1/types"

import * as styles from "./MsgAnchor.module.css"

const MsgAnchorView = () => {

  // @ts-ignore
  const { keplr, network, wallet } = useContext(WalletContext)

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

    const sender = wallet.bech32Address

    // TODO: account sequence ?
    // <chainInfo.rest>/cosmos/auth/v1beta1/accounts/<address>
    const accountSequence = "1"

    // TODO: account number ?
    // <chainInfo.rest>/cosmos/auth/v1beta1/accounts/<address>
    const accountNumber = 0

    console.log("handleSubmit kepler", keplr)
    console.log("handleSubmit network", network)
    console.log("handleSubmit sender", sender)

    let msg: MsgAnchor
    if (type == "graph") {
      msg = {
        $type: "regen.data.v1.MsgAnchor",
        sender: wallet.bech32Address,
        contentHash: {
          $type: "regen.data.v1.ContentHash",
          graph: {
            $type: "regen.data.v1.ContentHash.Graph",
            hash:  Buffer.from("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "base64"), // TODO
            digestAlgorithm:  DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256, // TODO
            canonicalizationAlgorithm: GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015, // TODO
            merkleTree: GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED, // TODO
          },
        },
      }
    } else if (type == "raw") {
      msg = {
        $type: "regen.data.v1.MsgAnchor",
        sender: wallet.bech32Address,
        contentHash: {
          $type: "regen.data.v1.ContentHash",
          raw: {
            $type: "regen.data.v1.ContentHash.Raw",
            hash:  Buffer.from("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "base64"), // TODO
            digestAlgorithm:  DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256, // TODO
            mediaType: RawMediaType.UNRECOGNIZED, // TODO
          },
        },
      }
    } else {
      setError("data type is required")
      return // exit on error
    }

    console.log("handleSubmit msg", msg)

    const bodyBytes = TxBody.encode({
      messages: [
        {
          typeUrl: `/${msg.$type}`,
          value: MsgAnchor.encode(msg).finish(),
        },
      ],
      memo: "test",
      timeoutHeight: "0",
      extensionOptions: [],
      nonCriticalExtensionOptions: [],
    }).finish()

    console.log("handleSubmit bodyBytes", bodyBytes)

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
            denom: "uregen",
            amount: "0",
          },
        ],
        gasLimit: "1000000",
        payer: "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx",
        granter: "",
      }
    }).finish()

    console.log("handleSubmit authInfoBytes", authInfoBytes)

    const signDoc: SignDoc = {
      bodyBytes,
      authInfoBytes,
      chainId: network,
      accountNumber,
    }

    console.log("handleSubmit signDoc", signDoc)

    window?.keplr?.signDirect(network, sender, signDoc).then(signResponse => {
      console.log("sign success", signResponse)

      const signedTx = TxRaw.encode({
        bodyBytes: signResponse.signed.bodyBytes,
        authInfoBytes: signResponse.signed.authInfoBytes,
        signatures: [
            Buffer.from(signResponse.signature.signature, "base64"),
        ],
      }).finish()

      console.log("signedTx", signedTx)

      const mode = "sync" as BroadcastMode

      window?.keplr?.sendTx(network, signedTx, mode).then(res => {
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
