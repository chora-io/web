import * as React from "react"
import { useContext, useState } from "react"
import { Buffer } from "buffer"

import { SignMode } from "@keplr-wallet/proto-types/cosmos/tx/signing/v1beta1/signing"
import { AuthInfo, TxBody, TxRaw } from "@keplr-wallet/proto-types/cosmos/tx/v1beta1/tx"
import { BroadcastMode, SignDoc } from "@keplr-wallet/types"

import { WalletContext } from "../../context/WalletContext"
import { MsgAnchor } from "../../../api/regen/data/v1/tx"
import {
  DigestAlgorithm,
  GraphCanonicalizationAlgorithm,
  GraphMerkleTree,
  RawMediaType,
} from "../../../api/regen/data/v1/types"

import * as styles from "./MsgAnchor.module.css"

const queryAccount = "/cosmos/auth/v1beta1/accounts"
const queryTx = "/cosmos/tx/v1beta1/txs"

const MsgAnchorView = () => {

  // @ts-ignore
  const { chainInfo, wallet } = useContext(WalletContext)

  // form input
  const [hash, setHash] = useState<string>("")
  const [digest, setDigest] = useState<number>(0)
  const [type, setType] = useState<string>("")
  const [canon, setCanon] = useState<number>(0)
  const [merkle, setMerkle] = useState<number>(0)
  const [media, setMediaType] = useState<number>(0)

  // response and error
  const [response, setResponse] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

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

    let msg: MsgAnchor

    if (type == "graph") {
      msg = {
        $type: "regen.data.v1.MsgAnchor",
        sender: wallet.bech32Address,
        contentHash: {
          $type: "regen.data.v1.ContentHash",
          graph: {
            $type: "regen.data.v1.ContentHash.Graph",
            hash: Buffer.from(hash, "base64"),
            digestAlgorithm: digest,
            canonicalizationAlgorithm: canon,
            merkleTree: merkle,
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
            hash: Buffer.from(hash, "base64"),
            digestAlgorithm: digest,
            mediaType: media,
          },
        },
      }
    } else {
      setError("data type is required")
      return // exit on error
    }

    const bodyBytes = TxBody.encode({
      messages: [
        {
          typeUrl: `/${msg.$type}`,
          value: MsgAnchor.encode(msg).finish(),
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
        gasLimit: "100000",
        payer: "regen1jx34255cgvxpthkg572ma6rhq6crwl6x2s4ajx",
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
        setResponse(Buffer.from(res).toString("hex"))
        setError("")

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
              // @ts-ignore
              onChange={event => setDigest(event.target.value)}
            >
              <option value={DigestAlgorithm.DIGEST_ALGORITHM_UNSPECIFIED}>
                {"unspecified"}
              </option>
              <option value={DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256}>
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
                  // @ts-ignore
                  onChange={event => setCanon(event.target.value)}
                >
                  <option value={GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED}>
                    {"unspecified"}
                  </option>
                  <option value={GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015}>
                    {"URDNA2015"}
                  </option>
                </select>
              </label>
              <label htmlFor="merkle">
                {"graph merkle tree type"}
                <select
                  id="merkle"
                  value={merkle}
                  // @ts-ignore
                  onChange={event => setMerkle(event.target.value)}
                >
                  <option value={GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED}>
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
                value={media}
                // @ts-ignore
                onChange={event => setMediaType(event.target.value)}
              >
                <option>
                  {"unspecified"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_TEXT_PLAIN}>
                  {"TXT"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_JSON}>
                  {"JSON"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_CSV}>
                  {"CSV"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_XML}>
                  {"XML"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_PDF}>
                  {"PDF"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_TIFF}>
                  {"TIFF"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_JPG}>
                  {"JPG"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_PNG}>
                  {"PNG"}
                </option>
                <option value={RawMediaType.RAW_MEDIA_TYPE_SVG}>
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
            <a href={chainInfo.rest + queryTx + "/" + response}>
              {chainInfo.rest + queryTx + "/" + response}
            </a>
          </pre>
        </div>
      )}
    </>
  )
}

export default MsgAnchorView
