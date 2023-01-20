import * as React from "react"
import { useContext, useEffect, useState } from "react"

import { WalletContext } from "chora"
import { MsgSubmitProposal } from "chora/api/cosmos/group/v1/tx"
import { Exec } from "chora/api/cosmos/group/v1/types"
import { choraTestnet } from "chora/utils/chains"
import { signAndBroadcast } from "chora/utils/tx"

import InputIRI from "chora/components/InputIRI"
import ResultTx from "chora/components/ResultTx"
import SelectAccount from "chora/components/SelectAccount"
import SelectExecution from "chora/components/SelectExecution"
import SelectMessage from "chora/components/SelectMessage"

import * as styles from "./SubmitProposal.module.css"

const groupId = "1" // TODO: configuration file
const queryPolicies = "cosmos/group/v1/group_policies_by_group"
const serverUrl = "https://server.chora.io"

const SubmitProposal = () => {

  const { chainInfo, network, wallet } = useContext(WalletContext)

  // policies
  const [policies, setPolicies] = useState<any>(null)

  // form input
  const [address, setAddress] = useState<string>("")
  const [metadata, setMetadata] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [execution, setExecution] = useState<number>(Exec["EXEC_UNSPECIFIED"])

  // form input metadata
  // ...

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

      const ps = []

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

    const msg = {
      $type: "cosmos.group.v1.MsgSubmitProposal",
      proposers: [wallet.bech32Address],
      groupPolicyAddress: address,
      metadata: metadata,
      messages: [message],
      exec: execution,
    } as MsgSubmitProposal

    const encMsg = MsgSubmitProposal.encode(msg).finish()

    await signAndBroadcast(chainInfo, wallet.bech32Address, msg, encMsg)
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
            id="policy"
            label="policy"
            options={policies}
            address={address}
            setAddress={setAddress}
          />
          <InputIRI
            id="proposal-metadata"
            label="proposal metadata"
            network={network}
            iri={metadata}
            setIri={setMetadata}
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
