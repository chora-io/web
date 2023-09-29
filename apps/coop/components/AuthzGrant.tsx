import Link from 'next/link'
import { useContext, useEffect, useState } from 'react'

import { WalletContext } from 'chora'
import { useNetworkCoop, useNetworkServer } from 'chora/hooks'
import { formatTimestamp } from 'chora/utils'

import styles from './AuthzGrant.module.css'

const queryMembers = 'cosmos/group/v1/group_members'
const queryPolicy = 'cosmos/group/v1/group_policy_info'

const AuthzGrant = ({ grant }: any) => {
  const { chainInfo } = useContext(WalletContext)

  const [groupId] = useNetworkCoop(chainInfo)
  const [serverUrl] = useNetworkServer(chainInfo)

  const [error, setError] = useState<string | undefined>(undefined)
  const [grantee, setGrantee] = useState<any>(undefined)
  const [granter, setGranter] = useState<any>(undefined)

  // reset state on grant or network change
  useEffect(() => {
    setError(undefined)
    setGrantee(undefined)
    setGranter(undefined)
  }, [grant, chainInfo?.chainId])

  // fetch on load and group or grant grantee or granter change
  useEffect(() => {
    if (groupId) {
      fetchGrantee().catch((err) => {
        setError(err.message)
      })
      fetchGranter().catch((err) => {
        setError(err.message)
      })
    }
  }, [groupId, grant?.grantee, grant?.granter])

  // fetch grantee from selected network and network server
  const fetchGrantee = async () => {
    let iri: string | undefined
    let isPolicyAddress: boolean

    // handle grantee as policy, otherwise member
    try {
      // fetch policy from selected network
      await fetch(chainInfo.rest + '/' + queryPolicy + '/' + grant['grantee'])
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            // throw error to trigger catch
            throw Error(res.message)
          } else {
            isPolicyAddress = true
            iri = res['info']['metadata']
          }
        })
    } catch (e) {
      // do nothing with error

      // TODO(cosmos-sdk): query member by group id and member address

      // fetch members from selected network
      await fetch(chainInfo.rest + '/' + queryMembers + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            const found = res['members'].find(
              (m: any) => m['member']['address'] === grant['grantee'],
            )
            if (found) {
              iri = found['member']['metadata']
            }
          }
        })
    }

    if (iri) {
      // fetch member metadata from network server
      await fetch(serverUrl + '/data/' + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res['jsonld'])
            if (
              data['@context'] !==
                'https://schema.chora.io/contexts/group_policy.jsonld' &&
              data['@context'] !==
                'https://schema.chora.io/contexts/group_member.jsonld'
            ) {
              setError('unsupported metadata schema')
            } else {
              setError('')
              setGrantee({
                isPolicyAddress,
                address: grant['grantee'],
                name: data['name'],
              })
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }

  // fetch granter from selected network and network server
  const fetchGranter = async () => {
    let iri: string | undefined
    let isPolicyAddress: boolean

    // handle grantee as policy, otherwise member
    try {
      // fetch policy from selected network
      await fetch(chainInfo.rest + '/' + queryPolicy + '/' + grant['granter'])
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            // throw error to trigger catch
            throw Error(res.message)
          } else {
            isPolicyAddress = true
            iri = res['info']['metadata']
          }
        })
    } catch (e) {
      // do nothing with error

      // TODO(cosmos-sdk): query member by group id and member address

      // fetch members from selected network
      await fetch(chainInfo.rest + '/' + queryMembers + '/' + groupId)
        .then((res) => res.json())
        .then((res) => {
          if (res.code) {
            setError(res.message)
          } else {
            const found = res['members'].find(
              (m: any) => m['member']['address'] === grant['granter'],
            )
            if (found) {
              iri = found['member']['metadata']
            }
          }
        })
    }

    if (iri) {
      // fetch policy or member metadata from network server
      await fetch(serverUrl + '/data/' + iri)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            setError(res.error)
          } else {
            const data = JSON.parse(res['jsonld'])
            if (
              data['@context'] !==
                'https://schema.chora.io/contexts/group_policy.jsonld' &&
              data['@context'] !==
                'https://schema.chora.io/contexts/group_member.jsonld'
            ) {
              setError('unsupported metadata schema')
            } else {
              setError('')
              setGranter({
                isPolicyAddress,
                address: grant['granter'],
                name: data['name'],
              })
            }
          }
        })
        .catch((err) => {
          setError(err.message)
        })
    }
  }

  return (
    <div className={styles.boxItem}>
      <div className={styles.boxText}>
        <h3>{'granter'}</h3>
        {granter ? (
          <p>
            {`${granter['name']} (`}
            <Link
              href={`/${granter.isPolicyAddress ? 'policies' : 'members'}/${
                granter['address']
              }`}
            >
              {granter['address']}
            </Link>
            {')'}
          </p>
        ) : (
          <p>{grant['granter']}</p>
        )}
      </div>
      <div className={styles.boxText}>
        <h3>{'grantee'}</h3>
        {grantee ? (
          <p>
            {`${grantee['name']} (`}
            <Link
              href={`/${grantee.isPolicyAddress ? 'policies' : 'members'}/${
                grantee['address']
              }`}
            >
              {grantee['address']}
            </Link>
            {')'}
          </p>
        ) : (
          <p>{grant['grantee']}</p>
        )}
      </div>
      {grant['authorization']['@type'] ===
        '/cosmos.authz.v1beta1.GenericAuthorization' && (
        <div className={styles.boxText}>
          <h3>{'message'}</h3>
          <p>{grant['authorization']['msg']}</p>
        </div>
      )}
      <div className={styles.boxText}>
        <h3>{'expiration'}</h3>
        <p>{formatTimestamp(grant['expiration'])}</p>
      </div>
    </div>
  )
}

export default AuthzGrant
