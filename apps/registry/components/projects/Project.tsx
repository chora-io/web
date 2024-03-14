'use client'

import { Result } from 'chora/components'
import { WalletContext } from 'chora/contexts'
import { useParams } from 'next/navigation'
import { useContext } from 'react'

// import { useProject } from '@hooks/useProject'

import styles from './Project.module.css'

const Project = () => {
  const { id } = useParams()

  const { chainInfo } = useContext(WalletContext)

  // fetch class and class metadata from selected network and network server
  // const [project, metadata, error] = useProject(chainInfo, `${id}`)

  return (
    <div className={styles.box}>
      <div className={styles.boxText}>
        <h3>{'id'}</h3>
        <p>{id ? id : 'NA'}</p>
      </div>
      {/*<div className={styles.boxText}>*/}
      {/*  <h3>{'issuer'}</h3>*/}
      {/*  <p>{project && project['issuer'] ? project['issuer'] : 'NA'}</p>*/}
      {/*</div>*/}
      {/*<div className={styles.boxText}>*/}
      {/*  <h3>{'issuance date'}</h3>*/}
      {/*  <p>{project && project['issuance_date'] ? project['issuance_date'] : 'NA'}</p>*/}
      {/*</div>*/}
      {/*{error && (*/}
      {/*  <div className={styles.boxText}>*/}
      {/*    <Result error={error} />*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  )
}

export default Project
