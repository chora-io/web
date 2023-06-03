import * as React from "react"
import { useContext, useEffect, useState } from "react"
import * as jsonld from "jsonld"

import { WalletContext } from "chora"
import { MsgSubmitProposal } from "chora/api/cosmos/group/v1/tx"
import { choraTestnet } from "chora/chains"
import { signAndBroadcast } from "chora/utils/tx"

import InputString from "chora/components/InputString"
import ResultTx from "chora/components/ResultTx"
import SelectAccount from "chora/components/SelectAccount"
import SelectExecution from "chora/components/SelectExecution"
import SelectMessage from "chora/components/SelectMessage"

import * as styles from "./SubmitProposal.module.css"

const groupId = "1" // TODO: configuration file
const queryPolicies = "cosmos/group/v1/group_policies_by_group"
const serverUrl = "https://server.chora.io"

const SubmitProposal = () => {

  const { chainInfo, wallet } = useContext(WalletContext)

  // fetch options
  const [policies, setPolicies] = useState<any[]>([])

  // form input
  const [address, setAddress] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [message, setMessage] = useState<any>(undefined)
  const [execution, setExecution] = useState<string>("")

  // fetch and form error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  // fetch on load and value change
  useEffect(() => {
    setPolicies(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies and metadata if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {
      fetchPoliciesAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  // fetch policies and metadata asynchronously
  const fetchPoliciesAndMetadata = async () => {

    let ps: any[] = []

    // fetch policies from selected network
    await fetch(chainInfo.rest + "/" + queryPolicies + "/" + groupId)
      .then(res => res.json())
      .then(res => {
        if (res.code) {
          setError(res.message)
        } else {
          res["group_policies"].map(p => {
            ps.push(p)
          })
        }
      })

    // create promise for all async fetch calls
    const promise = ps.map(async (p, i) => {

      // fetch policy data from chora server
      await fetch(serverUrl + "/" + p["metadata"])
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setError(res.error)
          } else if (res.context !== "https://schema.chora.io/contexts/group_policy.jsonld") {
            setError("unsupported metadata schema")
          } else {
            ps[i] = {
              ...ps[i],
              ...JSON.parse(res["jsonld"]),
            }
          }
        })
        .catch(err => {
          setError(err.message)
        })
    })

    // set state after promise all complete
    await Promise.all(promise).then(() => {

      // sort policies by name
      ps = ps.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1
        return 0
      })

      setPolicies(ps)
    })
  }

  // submit proposal asynchronously
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    // set JSON-LD document
    const doc = {
      "@context": "https://schema.chora.io/contexts/group_proposal.jsonld",
      name: name,
      description: description,
    }

    // check and normalize JSON-LD document
    const normalized = await jsonld.normalize(doc, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
    }).catch(err => {
      setError(err.message)
      return
    })

    // return error if empty
    if (normalized == "") {
      setError("JSON-LD empty after normalized")
      return
    }

    // set post request body
    const body = {
      canon: "URDNA2015",
      context: "https://schema.chora.io/contexts/group_proposal.jsonld",
      digest: "BLAKE2B_256",
      jsonld: JSON.stringify(doc),
      merkle: "UNSPECIFIED"
    }

    let iri: string

    // post data to chora server
    await fetch(serverUrl, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then(res => res.json())
      .then(data => {
        if (data.code) {
          setError(data.message)
        } else {
          iri = data["iri"]
        }
      })
      .catch(err => {
        setError(err.message)
      })

    // return error if iri never set
    if (typeof iri === "undefined") {
      return
    }

    // set submit proposal message
    const msg = {
      proposers: [wallet["bech32Address"]],
      groupPolicyAddress: address,
      metadata: iri,
      messages: message ? [message] : [],
      exec: execution,
    } as MsgSubmitProposal

    // convert message to any message
    const msgAny = {
      typeUrl: "/cosmos.group.v1.MsgSubmitProposal",
      value: MsgSubmitProposal.encode(msg).finish(),
    }

    // sign and broadcast message to selected network
    await signAndBroadcast(chainInfo, wallet["bech32Address"], [msgAny])
      .then(res => {
        setSuccess(res)
      }).catch(err => {
        setError(err.message)
      })
  }

  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <SelectAccount
          id="proposal-policy"
          label="proposal policy"
          options={policies}
          address={address}
          setAddress={setAddress}
        />
        <InputString
          id="proposal-name"
          label="proposal name"
          placeholder="New Proposal"
          string={name}
          setString={setName}
        />
        <InputString
          id="proposal-description"
          label="proposal description"
          placeholder="A proposal for group members to vote on."
          string={description}
          setString={setDescription}
        />
        <SelectMessage
          id="proposal-message"
          label="proposal message"
          setMessage={setMessage}
        />
        <SelectExecution
          id="proposal-execution"
          label="proposal execution"
          execution={execution}
          setExecution={setExecution}
        />
        <button type="submit">
          {"submit"}
        </button>
      </form>
      {(success || error) && (
        <div className={styles.boxResultBelow}>
          <ResultTx
            error={error}
            rest={chainInfo?.rest}
            success={success}
          />
        </div>
      )}
    </div>
  )
}

export default SubmitProposal
