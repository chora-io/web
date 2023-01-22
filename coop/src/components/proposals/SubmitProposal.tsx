import * as React from "react"
import { useContext, useEffect, useState } from "react"
import * as jsonld from "jsonld"

import { WalletContext } from "chora"
import { MsgSubmitProposal } from "chora/api/cosmos/group/v1/tx"
import { Exec } from "chora/api/cosmos/group/v1/types"
import { choraTestnet } from "chora/utils/chains"
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

  // policies
  const [policies, setPolicies] = useState<any>(null)

  // form input
  const [address, setAddress] = useState<string>("")
  const [name, setName] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [message, setMessage] = useState<any>(null)
  const [execution, setExecution] = useState<number>(Exec["EXEC_UNSPECIFIED"])

  // error and success
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  useEffect(() => {
    setPolicies(null)
    setError("")

    // error if network is not chora-testnet-1
    if (chainInfo && chainInfo.chainId !== choraTestnet.chainId) {
      setError("switch to chora-testnet-1")
    }

    // fetch policies if network is chora-testnet-1
    if (chainInfo && chainInfo.chainId === choraTestnet.chainId) {

      // async function workaround
      const fetchPoliciesAndMetadata = async () => {

      let ps = []

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
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          })

          setPolicies(ps)
        })
      }

      // call async function
      fetchPoliciesAndMetadata().catch(err => {
        setError(err.message)
      })
    }
  }, [chainInfo])

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    setError("")
    setSuccess("")

    // set doc
    const doc = {
      "@context": "https://schema.chora.io/contexts/group_proposal.jsonld",
      name: name,
      description: description,
    }

    // check and normalize JSON-LD
    const normalized = await jsonld.normalize(doc, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
    }).catch(err => {
      setError(err.message)
      return
    })

    if (normalized == "") {
      setError("JSON-LD empty after normalized")
      return
    }

    const body = {
      canon: "URDNA2015",
      context: "https://schema.chora.io/contexts/group_proposal.jsonld",
      digest: "BLAKE2B_256",
      jsonld: JSON.stringify(doc),
      merkle: "UNSPECIFIED"
    }

    let iri: string

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

    // return on error (iri never set)
    if (typeof iri === "undefined") {
      return
    }

    const msg = {
      $type: "cosmos.group.v1.MsgSubmitProposal",
      proposers: [wallet.bech32Address],
      groupPolicyAddress: address,
      metadata: iri,
      messages: [message],
      exec: execution,
    } as MsgSubmitProposal

    const msgAny = {
      typeUrl: "/chora.voucher.v1.MsgCreate",
      value: MsgSubmitProposal.encode(msg).finish(),
    }

    await signAndBroadcast(chainInfo, wallet["bech32Address"], [msgAny])
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
      </div>
      <ResultTx
        error={error}
        rest={chainInfo?.rest}
        success={success}
      />
    </>
  )
}

export default SubmitProposal
