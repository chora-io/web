import * as React from "react"

import Main from "../layouts/Main"
import Seo from "../components/SeoWrapper"

import * as styles from "./index.module.css"

const docsLink = "https://docs.chora.io"
const notionLink = "https://chora.notion.site/What-is-Chora-f188f982c4c34792b067e644810a488d"
const regenLink = "https://www.mintscan.io/regen/validators/regenvaloper1t8p3zdu3h8qzggfmvvvmtdnaj4trcsfh79xp4e"

const HomePage = () => (
  <Main withBackground={true}>
    <div className={styles.container} >
      <div className={styles.sectionMain}>
        <div>
          <h1>
            {"chora"}
          </h1>
          <p>
            <i>
              {"the grass is always greener on the decentralized web"}
            </i>
          </p>
          <p>
            {"distributed ledger technology"}
          </p>
        </div>
      </div>
      <div className={styles.sectionText}>
        <div>
          <p>
            {"We are prototyping software tools and services for commons governance and ecological regeneration using distributed ledger technologies."}
          </p>
          <p>
            {"We also run a validator on "}
            <a href={regenLink} target="_blank">
              {"Regen"}
            </a>
            {" in addition to multiple validators on test networks including Chora Testnet and Regen Redwood."}
          </p>
          <div className={styles.sectionTextLinks}>
            <a href={notionLink} target="_blank">
              {"learn more"}
            </a>
            <a href={docsLink} target="_blank">
              {"view docs"}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.sectionMain}>
        <div>
          <h1>
            {"connect"}
          </h1>
          <p>
            {"contact [ at ] chora.io"}
          </p>
        </div>
      </div>
    </div>
  </Main>
)

export const Head = () => <Seo title="" />

export default HomePage
