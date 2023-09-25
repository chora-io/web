'use client'

// import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'

import Authz from "@components/Authz"
import Feegrant from "@components/Feegrant"
import Policies from "@components/policies/Policies"
import Policy from "@components/policies/Policy"

import styles from "./page.module.css"

// export const metadata: Metadata = {
//   title: 'policies',
// }

const PoliciesPage = () => {

  const searchParams = useSearchParams()
  const policyAddress = searchParams.get("address")

  return (
    <div className={styles.page}>
      {policyAddress ? (
        <div>
          <h1>
            {"group policy"}
          </h1>
          <Policy
            policyAddress={policyAddress}
          />
          <h1>
            {"authorizations"}
          </h1>
          <Authz
            address={policyAddress}
          />
          <h1>
            {"fee allowances"}
          </h1>
          <Feegrant
            address={policyAddress}
          />
        </div>
      ) : (
        <div>
          <h1>
            {"group policies"}
          </h1>
          <Policies />
        </div>
      )}
    </div>
  )
}

export default PoliciesPage
