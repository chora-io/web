import * as React from "react"

import Main from "../layouts/Main"
import Seo from "../components/Seo"

import * as styles from "./index.module.css"

const Index = () => (
  <Main>
    <div className={styles.container} >
      <div className={styles.banner}>
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
            {"decentralized protocol research"}
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <p>
            {'We are a small team of researchers, engineers, and creatives who share a mission to explore "outside the city proper" (see '}
            <a href="https://en.wikipedia.org/wiki/Kh%C3%B4ra" target="_blank">
              {"χώρα"}
            </a>
            {")."}
          </p>
          <p>
            {"We are currently researching the use of decentralized blockchain protocols for commons governance and ecological regeneration."}
          </p>
          <div className={styles.links}>
            <a href="https://chora.notion.site/What-is-Chora-f188f982c4c34792b067e644810a488d" target="_blank">
              {"learn more"}
            </a>
            <a href="https://docs.chora.io" target="_blank">
              {"view docs"}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.banner}>
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

export default Index
